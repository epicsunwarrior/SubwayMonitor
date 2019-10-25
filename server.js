'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

let subwayMonitor = require('./SubwayMonitor');

app.get('/status', function (req, res) {
	let line = req.query.line || "";

	if (!line || line == "") {
		res.writeHead(400, {'Content-Type': 'text/json'});
		res.write("Line not specified");
		res.end();
		return;
	}

	try {
		let result = subwayMonitor.getStatus(line);
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.write(JSON.stringify({
			line: line,
			isDelayed: result,
		}));
		res.end();
		return;
	} catch (err) {
		console.log(err);
		res.writeHead(500, {'Content-Type': 'text/json'});
		res.write(err);
		res.end();
		return;
	}
});

app.get('/uptime', function (req, res) {
	let line = req.query.line || "";

	if (!line || line == "") {
		res.writeHead(400, {'Content-Type': 'text/json'});
		res.write("Line not specified");
		res.end();
		return;
	}

	try {
		let result = subwayMonitor.getUptime(line);
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.write(JSON.stringify({
			line: line,
			uptime: result,
		}));
		res.end();
		return;
	} catch (err) {
		console.log(err);
		res.writeHead(500, {'Content-Type': 'text/json'});
		res.write(err);
		res.end();
		return;
	}
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port);

})
