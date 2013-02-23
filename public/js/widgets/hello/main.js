define(['text!./hello.html'], function(hello) {
  return {
    initialize: function() {
      this.html(hello);
    }    
  }
});