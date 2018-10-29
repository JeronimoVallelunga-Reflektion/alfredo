let events = [];
let onChange = null;
const _log = console.log;
const _error = console.error;
const _warning = console.warning;

const appendEvent = (method, type) => function(...args) {
  const newEvent = { type, payload: args, timestamp: Date.now() };
  method.apply(console, args);
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
    return events.filter((event) => event.payload[0] !== '%c prev state' && event.payload[0] !== '%c next state');
  },

  serialize: function() {
    return this.get().filter(event => event.type !== 'console:log').map(({ timestamp, payload }) => ({
      timestamp,
      message: payload.join(' '),
    }));
  },

  onChange: function(callback) {
    onChange = callback;
  }
};
