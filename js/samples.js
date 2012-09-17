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

    // Initialize samples and assign them to dom data.
    $("[data-sample]").each(function() {
      var index = $(this).data("sample");
      var instance = window.samples[index].initialize(this);
      $(this).data("instance", instance);

      // Hack to force samples to render at least once before pause.
      instance.active = true;
    });

    // Hack to force samples to render at least once before pause.
    setInterval(function() {
      $("[data-sample]").each(function() {
        var instance = $(this).data("instance");
        if(!$(this).closest("section").hasClass("present"))
          instance.active = false;
      });
    }, 1000);

    // Activate appropriate sample on slide change.
    Reveal.addEventListener('slidechanged', function(event) {
      $("[data-sample]").each(function() {
        var instance = $(this).data("instance");
        if(instance) instance.active = false;
      });

      var currentSlide = event.currentSlide;
      $(currentSlide).find("[data-sample]").each(function() {
        console.log("Slide changed to a " + $(this).data("sample") + " sample.");

        var instance = $(this).data("instance");
        if(instance) instance.active = true;
      });
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
