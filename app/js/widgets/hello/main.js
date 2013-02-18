define('__widget__$hello@default', ['text!./hello.html'], function(hello) {
  return {
    initialize: function() {
      this.html(hello);
    }    
  }
});