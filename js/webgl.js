(function() {
  window.webgl_defaults = {
    width: 320,
    height: 240
  };

  window.webgl_samples = {};

  function initializeOnLoad() {
    $("[data-webgl-sample]").each(function() {
      var index = $(this).data("webgl-sample");
      window.webgl_samples[index].initialize(this);
    });
  };

  head.js(
    "js/samples/intro.js",
    "js/samples/spinning_cube.js",
    "js/samples/load_startrek_enterprise.js",
    "js/samples/load_apache.js",
    initializeOnLoad
  );
})();
