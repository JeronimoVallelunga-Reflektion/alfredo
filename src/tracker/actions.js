let events = [];
let onChange = null;

const appendEvent = ({ detail }) => {
  const newEvent = { type: 'redux:action', payload: detail };
  events.push(newEvent);
  if (onChange) {  onChange(newEvent); }
};

export default {
  start: function() {
    document.body.addEventListener('alfredo:redux:action', appendEvent, false);
  },

  stop: function() {
    document.body.removeEventListener('alfredo:redux:action', appendEvent, false);
    events = [];
  },

  get: function() {
    return events;
  },

  onChange: function(callback) {
    onChange = callback;
  }  
};