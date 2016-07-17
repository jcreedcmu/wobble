c = $("#c")[0];
d = c.getContext('2d');
w = c.width = 500;
h = c.height = 500;
W = 10;
H = 10;
var n = 0;

function render(x, y, s) {
  d.clearRect(0, 0, w, h);
  d.fillRect(w/2-W/2+x,h/2-H/2+y,W,H);

}

//render(0,0);
var gn = new GyroNorm();
ws = new WebSocket('ws://' + window.location.hostname+ ':8080');

var cache = null;
function send(x) {
  var s = JSON.stringify(x);
  if (s != cache) {
	 cache = s;
	 ws.send(s);
  }
}
var send_orientation = function() {}
ws.onopen = function() {
  send_orientation = function(x, y) {
	 send([x, y]);
  };
};
ws.onclose = function() {
  send_orientation = function(x, y) {
  };
};

gn.init().then(function() {

  var orientation = gn.isAvailable().deviceOrientationAvailable;
  console.log("orientation:", orientation);
  $("#debug").text(orientation);

  gn.start(cb);
});

function cb(data) {
  if (data.dm != null) {
	 var x = data['do'].gamma;
	 var y = data['do'].beta;
	 render(x, y);
	 send_orientation(x, y);
  }
  n++;
}
