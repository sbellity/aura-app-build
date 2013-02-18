define(['text!./hello.html'], function(hello) {
  return {
    initialize: function() {
      this.render = _.bind(this.render, this);
      this.sandbox.on('hello', this.render);
      this.render();
    },
    render: function() {
      this.html(hello);
    }
  }
});