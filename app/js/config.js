require.config({
  paths: {
    underscore:   'components/underscore/underscore',
    jquery:       'components/jquery/jquery',
    eventemitter: 'components/eventemitter2/lib/eventemitter2',
    text:         'components/requirejs-text/text',
    aura:         'components/aura/lib'
  },
  shim: {
    underscore: { exports: "_" }
  }
});