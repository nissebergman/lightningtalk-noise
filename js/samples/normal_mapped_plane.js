(function() {

  window.samples.normal_mapped_plane = {

    initialize: function(canvas) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 75, sample_defaults.width / sample_defaults.height, 1, 1000 );
      camera.position.z = 100;

      var geometry = new THREE.CubeGeometry( 70, 70, 70 );
      var material = new THREE.MeshLambertMaterial( { color: 0xdddddd } );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      var renderer = new THREE.CanvasRenderer({canvas: canvas});
      renderer.setSize( sample_defaults.width, sample_defaults.height );

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
