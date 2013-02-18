define(['text!./ola.html'], function(ola) {
  return {
    initialize: function() {
      console.warn("-----> Calling init on ola ?", this.options.formidable);
      this.sandbox.on('ola', function() {
        this.render();
      }.bind(this));
      this.template = this.sandbox.template.parse(ola);
      this.renderCount = 0;
      this.render();
    },
    render: function() {
      this.renderCount++;
      this.html(this.template({
        formidable: this.options.formidable,
        now: new Date,
        renderCount: this.renderCount
      }));
    }
  }
});