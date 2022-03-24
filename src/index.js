import Bucksapp from './bucksapp';

((function bucksapp(window) {
  if (typeof (window.Bucksapp) === 'undefined') {
    window.Bucksapp = new Bucksapp();
  }
})(window));