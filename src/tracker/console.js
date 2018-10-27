const override = (method, type, { events }) => function(message) {
  events.push({ type, message });
  method.apply(console, arguments);
};

export default (function(){
  const _log = console.log;
  const _error = console.error;
  const _warning = console.warning;

  let events = [];
  
  return {
    start: function() {
      console.log = override(_log, 'log', { events });
      console.error = override(_error, 'error', { events });
      console.warning = override(_warning, 'warning', { events });
    },

    stop: function() {
      console.log = _log;
      console.error = _error;
      console.warning = _warning;
      events = [];
    },

    get: function() {
      return events;
    }
  }  
  
})();