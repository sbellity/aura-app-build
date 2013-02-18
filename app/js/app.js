require(['aura/aura', 'aura/ext/mediator', 'aura/ext/widgets', 'jquery', 'underscore', 'eventemitter', 'text', './widgets'], function(Aura) {
  Aura().start({ widgets: 'body' }).then(function() {
    console.warn("Aura app started !");
  });
});