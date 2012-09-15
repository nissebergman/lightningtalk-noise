(function() {

  window.samples.normal_mapped_plane = {

    initialize: function(canvas) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 75, sample_defaults.width / sample_defaults.height, 1, 1000 );
      camera.position.z = 80;

      var geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
      geometry.computeTangents();

      var texture = new THREE.ImageUtils.loadTexture('images/normal_map.PNG', {}, function() {
        animate();
      });

      var uniforms = {
        "map" : { type: "t", value: 0, texture: texture },
        "uTime" : { type: "f", value: 1.0 }
      };

      exaggeratedTangents = _.map(geometry.faces[0].vertexTangents, function(v) { v.x = 3; return v; })
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

      var renderer = new THREE.WebGLRenderer({canvas: canvas});
      renderer.setSize( sample_defaults.width * 2, sample_defaults.height * 2 );

      function animate() {
        if(sample_defaults.paused) return;
        requestAnimationFrame( animate );
        mesh.rotation.y += 0.002;
        renderer.render( scene, camera );
      }
    }
  };
})();
