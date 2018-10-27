window.__ALFREDO_MIDDLEWARE__ = function(store) {
  return function (next) {
      return function(action) {
      var event = new CustomEvent('alfredo:redux:action', { detail: action });
      document.body.dispatchEvent(event);
      return next(action);
      }
  }
}
