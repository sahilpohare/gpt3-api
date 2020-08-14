const express = require('express');
const app = express();
const { PythonShell } = require('python-shell');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const cors = require('cors');
const { arrayIncludes, extractDomain } = require('./utils');

require('dotenv').config();
app.use(cors());
app.use(bodyParser.urlencoded(), bodyParser.json());

app.get('/', (req, res) => res.send('Mail Parse'));

app.post('/addSample', (req, res) => {
	const timestamp = Date.now();
	console.log('post : /addSample timestamp : ' + timestamp);
	axios({
		url: `${process.env.DATABASE_URL}/addSample`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: req.data
	}).catch((e) => console.log('failed post : /addSample timestamp: ' + timestamp));
});

app.get('/parse', async (req, res) => {
	const timestamp = Date.now();
	console.log('get : /parse timestamp : ' + timestamp);
	let data = Object.assign(req.body, { domain: extractDomain(req.body.from[0].address) });
	console.log(data);
	res.header('Content-Type', 'application/json');
	let { err, result } = parseData(data);
	if (!err) {
		console.log(result);
		try {
			result = result.map((val) => JSON.parse(val));
			res.send(JSON.stringify(result));
			return;
		} catch (e) {
			console.log('failed get : /parse timestamp : ' + timestamp, '\n', err);
			res.send('error');
		}
	} else {
		console.log(err);
		console.log('failed get : /parse timestamp : ' + timestamp, '\n', err);
		res.send('error');
	}
});

function parseData(data) {
	let stringy = JSON.stringify(data);
	PythonShell.run(
		'./new_parser.py',
		{
			args: [ '-b', stringy ]
		},
		(err, result) => {
			return { result, err };
		}
	);
}
app.listen(process.env.PORT || 3200, console.log(`Data Jingle at ${process.env.PORT || 3200}`));
