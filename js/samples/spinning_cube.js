(function() {

  window.webgl_samples.spinning_cube = {

    initialize: function(canvas) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 75, webgl_defaults.width / webgl_defaults.height, 1, 1000 );
      camera.position.z = 100;

      var geometry = new THREE.CubeGeometry( 50, 50, 50 );
      var material = new THREE.MeshLambertMaterial( { color: 0xdddddd } );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      var renderer = new THREE.CanvasRenderer({canvas: canvas});
      renderer.setSize( webgl_defaults.width, webgl_defaults.height );

      function animate() {

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
