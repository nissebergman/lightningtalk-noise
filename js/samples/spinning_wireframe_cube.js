(function() {

  window.samples.spinning_wireframe_cube = {

    initialize: function(canvas) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 30, sample_defaults.width / sample_defaults.height, 1, 1000 );
      camera.position.set(0, 3, 7);
      camera.lookAt( new THREE.Vector3(0,0,0));

      var scale = 2.5;
      var geometry = new THREE.CubeGeometry( scale, scale, scale );
      var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 3 } );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      var axisHelper = new THREE.AxisHelper();
      axisHelper.scale.x = axisHelper.scale.y = axisHelper.scale.z = 0.015;
      scene.add( axisHelper );

      var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
      renderer.setSize( sample_defaults.width, sample_defaults.height );

      var instance = { active: false };
      function animate() {
        requestAnimationFrame( animate, canvas );
        if(!instance.active || sample_defaults.paused) return;

        mesh.rotation.y += 0.008;

        renderer.render( scene, camera );
      }

      animate();
      return instance;
    }
  };
})();
