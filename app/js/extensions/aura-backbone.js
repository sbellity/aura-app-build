define({
  require: {
    paths: {
      backbone:   'components/backbone/backbone',
      underscore: 'components/underscore/underscore'
    },
    shim: {
      backbone: { 
        exports: 'Backbone', 
        deps: ['underscore', 'jquery'] 
      }
    }
  },
  initialize: function(app) {
    var Backbone = require('backbone');
    app.sandbox.mvc = Backbone;
  }
});