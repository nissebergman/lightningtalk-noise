(function() {

  window.samples.plane = {

    initialize: function(canvas) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 75, sample_defaults.width / sample_defaults.height, 1, 1000 );
      camera.position.z = 100;

      var geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
      var material = new THREE.MeshLambertMaterial( { wireframe: true, side: THREE.DoubleSide } );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      var renderer = new THREE.CanvasRenderer({canvas: canvas});
      renderer.setSize( sample_defaults.width * 1.4, sample_defaults.height * 1.4 );

      function animate() {
        requestAnimationFrame( animate );
        mesh.rotation.y += 0.01;
        renderer.render( scene, camera );
      }

      animate();
    }
  };
})();
