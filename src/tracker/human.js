import HumanInput from 'humaninput';

window.__VERSION__ = 'ALFREDO';
const HI = new HumanInput(window); 
let events = [];

export default {
  start: function() {
    HI.on(HumanInput.defaultListenEvents, (event, whatWasInput) => {
      events.push({ ...event, whatWasInput });
    });
  },

  stop: function() {
    HI.off();
    events = [];
  },

  get: function() {
    return events;
  }
};
