'use strict';
var server = require('http').createServer()
var url = require('url')
var WebSocketServer = require('ws').Server
var wss_c = new WebSocketServer({port: 8080});
var wss_h = new WebSocketServer({port: 8081})
var express = require('express');
var app = express()
var port = 4080;

app.use(express.static(__dirname));
app.listen(port, function () { console.log('Listening on ' + port) });

var server_ws = null;
var counter = 0;

function server_send(msg) {
  if (server_ws != null) {
	 try {
		server_ws.send(JSON.stringify(msg));
	 }
	 catch (e) {
		console.log(e);
	 }
  }
}

wss_c.on('connection', ws => {
  console.log('client conn');
  var id = counter++;
  ws.on('message', message => server_send({
	 message: JSON.parse(message),
	 id}));
  ws.on('close', () => server_send({close: true, id}));
});

wss_h.on('connection', ws => {
  console.log('server conn');
  server_ws = ws;
  ws.on('close', () => { server_ws = null; });
});
