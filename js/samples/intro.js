(function() {

  window.webgl_samples.intro = {

    initialize: function(canvas) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 75, webgl_defaults.width / webgl_defaults.height, 1, 1000 );
      camera.position.z = 100;

      var geometry = new THREE.TorusGeometry( 20, 20, 20, 20 );
      var material = new THREE.MeshLambertMaterial( { color: 0xdddddd,  wireframe: true } );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      var axisHelper = new THREE.AxisHelper();
      axisHelper.scale.x = axisHelper.scale.y = axisHelper.scale.z = 0.5;
      scene.add( axisHelper );

      var renderer = new THREE.CanvasRenderer({canvas: canvas});
      renderer.setSize( webgl_defaults.width * 2, webgl_defaults.height * 2 );

      function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );

        mesh.rotation.x = axisHelper.rotation.x += 0.01;
        mesh.rotation.y = axisHelper.rotation.y += 0.02;

        renderer.render( scene, camera );
      }

      animate();
    }
  };
})();

