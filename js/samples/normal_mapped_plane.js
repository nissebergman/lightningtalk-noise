(function() {

  var worlds = [];

  function preloadImages(images) {
    _.each(images, function(image) {
      var img = new Image();
      img.src = 'images/' + image;
    });
  }

  preloadImages(sample_defaults.normal_maps);

  function addNormalMappedPlane(scene) {
    var geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
    geometry.computeTangents();

    var texture = new THREE.ImageUtils.loadTexture('images/' + sample_defaults.current_normal_map, {});

    var uniforms = {
      "map" : { type: "t", value: 0, texture: texture },
      "uTime" : { type: "f", value: 1.0 }
    };

    var exaggeratedTangents = _.map(geometry.faces[0].vertexTangents, function(v) { v.x = 3; return v; })
    var attributes = {
      "tangent" : { type: "v3", value: exaggeratedTangents }
    };

    var vertexShader = $('#normal_map_vs').text();
    var fragmentShader = $('#normal_map_fs').text();

    var parameters = {
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: uniforms,
      attributes: attributes,
      side: THREE.DoubleSide
    };

    var normal_material = new THREE.ShaderMaterial( parameters );

    var mesh = new THREE.Mesh( geometry, normal_material );
    scene.add( mesh );
    return mesh;
  }

  function animate(world, mesh, force) {
    function recursiveAnimate() { animate(world, mesh); }

    var request_id = requestAnimationFrame( recursiveAnimate );
    if(force || !sample_defaults.paused) mesh.rotation.y += 0.01;

    world.renderer.render( world.scene, world.camera );
    return request_id;
  }

  window.samples.normal_mapped_plane = {
    worlds: worlds,

    resetNormalMaps: function() {
      _.each(worlds, function(world) {

        cancelAnimationFrame(world.requestAnimationFrameId);

        _.each(world.scene.children, function(child) { world.scene.remove(child); } );

        var mesh = addNormalMappedPlane(world.scene);
        animate(world, mesh, true);
        world.requestAnimationFrameId = animate(world, mesh, true);
      });
    },

    initialize: function(canvas) {
      var world = {};
      worlds.push(world);

      world.scene = new THREE.Scene();

      world.camera = new THREE.PerspectiveCamera( 75, sample_defaults.width / sample_defaults.height, 1, 1000 );
      world.camera.position.z = 80;

      world.renderer = new THREE.WebGLRenderer({canvas: canvas});
      world.renderer.setSize( sample_defaults.width * 2, sample_defaults.height * 2 );

      var mesh = addNormalMappedPlane(world.scene);

      world.requestAnimationFrameId = animate(world, mesh);
    }
  };
})();
