$(function() {

  var gui = new dat.GUI();
  gui.add(sample_defaults, "paused");
  gui.add(sample_defaults, "wireframe");

  var controller = gui.add(
    sample_defaults,
    "current_normal_map",
    sample_defaults.normal_maps);

  controller.onFinishChange(function(value) {
    console.log("Changing normal map to " + value);
    samples.normal_mapped_plane.resetNormalMaps();
    $("img.normal_map").prop("src", "images/" + value);
  });

  gui.closed = true;
});
