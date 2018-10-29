import HumanInput from 'humaninput';

window.__VERSION__ = 'ALFREDO';
const listenEvents = [...HumanInput.defaultListenEvents, 'mousemove'];
const HI = new HumanInput('#app', { listenEvents });

const toSerialize = ['mousemove', 'click', 'scroll', 'wheel'];
let events = [];
let onChange = null;

export default {
  start: function() {
    HI.on(listenEvents, (event, whatWasInput) => {
      const newEvent = { type: event.type, payload: { event, whatWasInput }, timestamp: Date.now() };
      events.push(newEvent);
      if (onChange) { onChange(newEvent); }
    });
  },

  stop: function() {
    HI.off();
    events = [];
  },

  get: function() {
    return events;
  },

  serialize: function() {
    return events.filter(event => toSerialize.includes(event.type)).map((event) => {
      let data = {};
      switch(event.type) {
        case 'wheel':
        case 'mousemove':
        case 'click':
          data = { x: event.payload.event.clientX, y: event.payload.event.clientY };
          break;
        case 'scroll':
          data = event.payload.whatWasInput;
          break;
        default:
      }

      return { type: event.type, timestamp: event.timestamp, ...data };
    });
  },

  onChange: function(callback) {
    onChange = callback;
  }
};
