let events = [];

const appendEvent = ({ detail }) => {
  events.push({ type: 'redux:action', action: detail });
  console.log('actions', events);
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
  }
};