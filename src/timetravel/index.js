const cursorIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCSB2aWV3Qm94PSIwIDAgMjggMjgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI4IDI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjguMiwyMC45IDguMiw0LjkgMTkuOCwxNi41IDEzLDE2LjUgMTIuNiwxNi42ICIvPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTcuMywyMS42IDEzLjcsMjMuMSA5LDEyIDEyLjcsMTAuNSAiLz48cmVjdCB4PSIxMi41IiB5PSIxMy42IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjkyMjEgLTAuMzg3MSAwLjM4NzEgMC45MjIxIC01Ljc2MDUgNi41OTA5KSIgd2lkdGg9IjIiIGhlaWdodD0iOCIvPjxwb2x5Z29uIHBvaW50cz0iOS4yLDcuMyA5LjIsMTguNSAxMi4yLDE1LjYgMTIuNiwxNS41IDE3LjQsMTUuNSAiLz48L3N2Zz4=';
let cursor = null;
let snapshots = [];
let timeouts = [];
let playing = false;

const createCursor = function() {
  if (!cursor && !document.getElementById('musCursor')) {
    var node = document.createElement("div");
    node.id = "musCursor";
    node.style.position = "fixed";
    node.style.width = "32px";
    node.style.height = "32px";
    node.style.top = "-100%";
    node.style.left = "-100%";
    node.style.borderRadius = "32px";
    node.style.backgroundImage = "url(" + cursorIcon + ")";
    cursor = node;
    document.body.appendChild(node);
  }
};

const destroyCursor = function() {
  if (cursor) { 
    cursor.remove();
    cursor = null;
  }
};

const createClickSnapshot = function(x, y) {
  var left = document.scrollingElement.scrollLeft;
  var top = document.scrollingElement.scrollTop;
  var node = document.createElement("div");
  node.className = "musClickSnapshot";
  node.style.position = "absolute";
  node.style.width = "32px";
  node.style.height = "32px";
  node.style.top = (x + top) + "px";
  node.style.left = (y + left) + "px";
  node.style.borderRadius = "32px";
  node.style.backgroundColor = "red";
  node.style.opacity = 0.2;
  snapshots.push(node);
  document.body.appendChild(node);
};

const destroyClickSnapshot = function() {
  while (snapshots.length > 0) {
    snapshots[0].remove();
  }
  snapshots = [];
};

const getXCoordinate = function(x) {
  if (window.outerWidth > this.window.width) {
    return parseInt(this.window.width * x / window.outerWidth);
  }

  return parseInt(window.outerWidth * x / this.window.width);
};

const getYCoordinate = function(y) {
  if (window.outerHeight > this.window.height) {
    return parseInt(this.window.height * y / window.outerHeight);
  }

  return parseInt(window.outerHeight * y / this.window.height);
};

const playEvent = function(event) {

  if (event.type === 'mousemove') {
    cursor.style.left = getXCoordinate(event.payload.x) + "px";
    cursor.style.top = getYCoordinate(event.payload.y) + "px";

  } else if (event.type === 'click') {
    createClickSnapshot(event.payload.x, event.payload.y);

  }
};

const stopEvent = function() {
  timeouts = [];
  playing = false;  
}

const stop = function() {
  destroyCursor();
  destroyClickSnapshot();
  stopEvent();
};

export default {
  start: function(events) {
		if (playing) return;

		createCursor();

    const init = events[0];
		for (let pos = 0; pos < events.length; pos++) {

			timeouts.push(setTimeout(function(pos) {
				playEvent(events[pos]);
				if (pos === events.length - 1) {
          stop();
				}
			}, events[pos].timestamp - init.timestamp), pos);
		};

    this.playing = true;
  },
};