from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")
from converter import convert
from gpt_train import GPTTrain
import os
import json
import argparse
import re
import requests


argparser = argparse.ArgumentParser()

argparser.add_argument("-i", "--input", type=str, default=None)
argparser.add_argument("-b", "--body", type=str, default=None)


args = argparser.parse_args()

filename = args.input
body = args.body


def get_data(domain):
    data = requests.get("http://localhost:3200/database/getSamples/" + domain)
    data = data.json()
    return data


if body != None:
    data_json = json.loads(body)
    domain = data_json["domain"]
    body = data_json["content"]
    c_type = data_json["contentType"]

subdomain = requests.get(
    "http://localhost:3200/database/getSubDomains/" + domain
).json()


def run(content, train, domain):
    try:
        response, check = train.parse(content)
        try:
            json.loads(response)
            response, status = verify(response, check)
            if status == "passed":
                retval = {"data": response, "error": None}
                return json.dumps(retval), "passed"
            else:
                return (
                    json.dumps({"data": response, "error": "key check failed"}),
                    "fail",
                )
        except Exception as e:
            return (
                json.dumps({"data": response, "error": "json parsing failed"}),
                "fail",
            )
    except Exception as e:
        return json.dumps({"data": response, "error": "unable to parse"}), "fail"


def verify(output, key_list):
    output = json.loads(output)
    for key in key_list:
        if list(output.keys()) == key:
            return output, "passed"
        else:
            pass
    return output, "fail"


def recurse(body, domain, counter):
    data = get_data(domain)
    train = GPTTrain(data, domain=domain)

    if filename != None:
        response, status = run(filename, train, domain)
        print(response)
        if status == "fail":
            if counter < len(subdomain) - 1:
                counter += 1
                domain = subdomain[counter]
                recurse(body, domain, counter)
            else:
                pass
        else:
            pass
    elif body != None:

        if c_type == "text/plain":
            response, status = run(body, train, domain)

            if status == "fail":
                if counter < len(subdomain) - 1:
                    counter += 1
                    domain = subdomain[counter]
                    recurse(body, domain, counter)
                else:
                    pass
            else:
                print(response)
        elif c_type == "text/html":
            body = convert(body)
            response, status = run(body, train, domain)

            if status == "fail":
                if counter < len(subdomain) - 1:
                    counter += 1
                    domain = subdomain[counter]
                    recurse(body, domain, counter)
                else:
                    pass
            else:
                print(response)


if __name__ == "__main__":

    if domain in subdomain:
        counter = 0
        recurse(body, domain, counter)
