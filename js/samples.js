(function() {
  window.sample_defaults = {
    width: 320,
    height: 240,
    paused: false,
    current_normal_map: "normal_map_tile.jpg",
    normal_maps: [
      "normal_map_face.PNG",
      "normal_map_circle.jpg",
      "normal_map_tile.jpg"
    ]
  };

  window.samples = {};

  function initializeOnLoad() {
    $("[data-sample]").each(function() {
      var index = $(this).data("sample");
      window.samples[index].initialize(this);
    });
  }

  head.js(
    "js/samples/particles.js",
    "js/samples/render_to_texture.js",
    "js/samples/blur_post_process.js",
    "js/samples/webgl_spinning_wireframe_cube.js",
    "js/samples/webgl_spinning_colored_cube.js",
    "js/samples/webgl_spinning_bland_cube.js",
    "js/samples/spinning_wireframe_torus.js",
    "js/samples/spinning_wireframe_cube.js",
    "js/samples/spinning_cube.js",
    "js/samples/spinning_textured_cube.js",
    "js/samples/lighted_sphere.js",
    "js/samples/normal_mapped_plane.js",
    "js/samples/plane.js",
    "js/samples/wireframe_plane.js",
    "js/samples/load_startrek_enterprise.js",
    "js/samples/load_apache.js",
    initializeOnLoad);
})();
