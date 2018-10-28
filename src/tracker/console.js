let events = [];
let onChange = null;
const _log = console.log;
const _error = console.error;
const _warning = console.warning;

const appendEvent = (method, type) => function(payload) {
  const newEvent = { type, payload };
  method.apply(console, arguments);
  events.push(newEvent);
  if (onChange) {  onChange(newEvent); }
};

export default {
  start: function() {
    console.log = appendEvent(_log, 'console:log', { events });
    console.error = appendEvent(_error, 'console:error', { events });
    console.warning = appendEvent(_warning, 'console:warning', { events });    
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