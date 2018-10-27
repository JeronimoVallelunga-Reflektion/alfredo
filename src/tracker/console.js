let events = [];
let onChange = null;
const _log = console.log;
const _error = console.error;
const _warning = console.warning;

const appendEvent = (method, type) => function(event) {
  const newEvent = { type, event };
  events.push(newEvent);
  method.apply(console, arguments);
  if (onChange) { 
    onChange(newEvent);
  }
};

export default {
  start: function() {
    console.log = appendEvent(_log, 'log', { events });
    console.error = appendEvent(_error, 'error', { events });
    console.warning = appendEvent(_warning, 'warning', { events });    
  },

  stop: function() {
    console.log = _log;
    console.error = _error;
    console.warning = _warning;
    events = [];
  },

  get: function() {
    return events;
  },

  onChange: function(callback) {
    onChange = callback;
  }
};