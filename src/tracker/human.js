import HumanInput from 'humaninput';

window.__VERSION__ = 'ALFREDO';
const listenEvents = HumanInput.defaultListenEvents;
const HI = new HumanInput('#app', { listenEvents }); 

let events = [];
let onChange = null;

export default {
  start: function() {
    HI.on(listenEvents, (event, whatWasInput) => {
      const newEvent = { type: event.type, payload: { event, whatWasInput } };
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

  onChange: function(callback) {
    onChange = callback;
  }  
};
