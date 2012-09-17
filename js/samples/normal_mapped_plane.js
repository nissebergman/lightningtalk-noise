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

  function animate(instance, mesh, force) {
    function recursiveAnimate() { animate(instance, mesh); }

    var request_id = requestAnimationFrame( recursiveAnimate );
    if(force || !sample_defaults.paused) mesh.rotation.y += 0.01;

    if(instance.active)
      instance.renderer.render( instance.scene, instance.camera );
    return request_id;
  }

  window.samples.normal_mapped_plane = {
    worlds: worlds,

    resetNormalMaps: function() {
      _.each(worlds, function(instance) {

        cancelAnimationFrame(instance.requestAnimationFrameId);

        _.each(instance.scene.children, function(child) { instance.scene.remove(child); } );

        var mesh = addNormalMappedPlane(instance.scene);
        animate(instance, mesh, true);
        instance.requestAnimationFrameId = animate(instance, mesh, true);
      });
    },

    initialize: function(canvas) {
      var instance = {active: false};
      worlds.push(instance);

      instance.scene = new THREE.Scene();

      instance.camera = new THREE.PerspectiveCamera( 75, sample_defaults.width / sample_defaults.height, 1, 1000 );
      instance.camera.position.z = 80;

      instance.renderer = new THREE.WebGLRenderer({canvas: canvas});
      instance.renderer.setSize( sample_defaults.width * 2, sample_defaults.height * 2 );

      var mesh = addNormalMappedPlane(instance.scene);

      instance.requestAnimationFrameId = animate(instance, mesh);
      return instance;
    }
  };
})();
