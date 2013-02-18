require(['components/aura/lib/aura'], function(Aura) {
  Aura({ debug: true })
    .use('extensions/aura-backbone')
    .use(function(app) { window.app = app; })
    .start({ widgets: 'body' })
    .then(function() {
      console.warn("Aura app started !");
    });
});