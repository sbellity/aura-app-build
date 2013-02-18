require(['components/aura/lib/aura'], function(Aura) {
  Aura().start({ widgets: 'body' }).then(function() {
    console.warn("Aura app started !");
  });
});