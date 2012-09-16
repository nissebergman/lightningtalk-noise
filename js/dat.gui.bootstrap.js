$(function() {
  var gui = new dat.GUI();
  gui.add(sample_defaults, "paused");
  gui.closed = true;
});
