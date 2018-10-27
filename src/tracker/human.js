import HumanInput from 'humaninput';
window.__VERSION__ = 'ALFREDO';
export default (function () {

  const HI = new HumanInput(window); 
  let events = [];

  return {
    start: function() {
      HI.on('click', (event) => {
        events.push({ type: 'click', event });
        console.log('human', events);
      });
    },

    stop: function() {
      HI.off();
      events = [];
    },

    get: function() {
      return events;
    }
  }
})();
