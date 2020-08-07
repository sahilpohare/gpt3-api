import openai
from gpt import Example
from gpt import GPT
from converter import convert
# from gpt_train import parse
import os

openai.api_key = 'sk-r5uc6is7lzeluGzpT0DOfYjbeJh7s8WPmMyfhngY'
PATH = './train_html'

def read_html(path):

    with open(path,'r') as f:
        resp = f.read()
        f.close()
        resp = convert(resp)
    return resp



train_mails = {
    'Auth.html':'resp1',
    'email_added.html':'resp4',
    'invite1.html':'resp2',
    'verification.html':'resp3'
}


resp = {
    'resp1':'{"Type":"Auth", "name":"rahul81", "application":"Dockship", "link":"https://github.com/settings/connections/applications/ccb42a8e19665bcd148e", "From":"The GitHub Team"}',
    'resp2':'{"Type":"Invitation", "invitor":"rahul81", "repo":"GPT3parser", "repolink":"https://github.com/rahul81/GPT3parser", "For":"sahilpohare@gmail.com"}',
    'resp3':'{"Type":"Verfication", "name":"rahul81", "Device":"Linux", "verification_code":"849680", "From":"The GitHub Team"}',
    'resp4':'{"Type":"email_added", "name":"rahul81", "new_email":"rahul.das@adypu.edu.in", "From":"The GitHub Team}'
}




def parse(test):
    gpt3 = GPT(engine='davinci',temperature=0.9,max_tokens=80)

    for key, val in train_mails.items():
        mail = read_html(os.path.join(PATH,key))
        gpt3.add_example(Example(mail,resp[val]))

    output = gpt3.get_top_reply(test).replace('output: ','').strip()

    return output

