define('__widget__$ola@default', ['text!./ola.html'], function(ola) {
  return {
    initialize: function() {
      this.html(ola);
    }    
  }
});