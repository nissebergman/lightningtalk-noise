(function() {
  window.sample_defaults = {
    width: 320,
    height: 240
  };

  window.samples = {};

  function initializeOnLoad() {
    $("[data-sample]").each(function() {
      var index = $(this).data("sample");
      window.samples[index].initialize(this);
    });
  };

  head.js(
    "js/samples/webgl_spinning_cube.js",
    "js/samples/spinning_wireframe_torus.js",
    "js/samples/spinning_wireframe_cube.js",
    "js/samples/spinning_cube.js",
    "js/samples/spinning_textured_cube.js",
    "js/samples/lighted_sphere.js",
    "js/samples/bump_mapped_wall.js",
    "js/samples/load_startrek_enterprise.js",
    "js/samples/load_apache.js",
    initializeOnLoad
  );
})();
