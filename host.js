c = $("#c")[0];
d = c.getContext('2d');
w = c.width = innerWidth;
h = c.height = innerHeight;
W = 10;
H = 10;
var n = 0;

var ccache = {};
function color_of_id(id) {
  if (!ccache[id]) {
	 ccache[id] = "#"+((1<<24)*Math.random()|0).toString(16);
  }
  return ccache[id];
}

function render(x, y, id) {
  d.save();
  d.globalAlpha = 0.01;
  d.fillStyle = "white";
  d.fillRect(0, 0, w, h);
  d.restore();
  d.fillStyle = color_of_id(id);
  d.fillRect(w/2-W/2+x * w / 100,h/2-H/2+y * h / 100,W,H);

}

ws = new WebSocket('ws://' + window.location.hostname+ ':8081');

var send_orientation = function() {}
ws.onmessage = function(x) {
  var z = JSON.parse(x.data);
  if (z.close) {

  }
  else {
	 render(z.message[0], z.message[1], z.id);
  }
};
