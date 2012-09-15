(function() {

  window.samples.spinning_wireframe_cube = {

    initialize: function(canvas) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 75, sample_defaults.width / sample_defaults.height, 1, 1000 );
      camera.position.z = 100;

      var geometry = new THREE.CubeGeometry( 70, 70, 70 );
      var material = new THREE.MeshLambertMaterial( { color: 0xdddddd, wireframe: true, wireframeLinewidth: 3 } );

      var axisHelper = new THREE.AxisHelper();
      axisHelper.scale.x = axisHelper.scale.y = axisHelper.scale.z = 0.5;
      scene.add( axisHelper );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      var renderer = new THREE.WebGLRenderer({canvas: canvas});
      renderer.setSize( sample_defaults.width, sample_defaults.height );

      function animate() {
        if(sample_defaults.paused) return;

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render( scene, camera );
      }

      animate();
    }
  };
})();
