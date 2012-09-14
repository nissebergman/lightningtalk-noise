(function() {

  window.samples.normal_mapped_plane = {

    initialize: function(canvas) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 75, sample_defaults.width / sample_defaults.height, 1, 1000 );
      camera.position.z = 100;

      var geometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
      var texture = new THREE.ImageUtils.loadTexture('images/normal_map.PNG', {}, function() {
        animate();
      });

      var texture_material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );

      // common material parameters

      var ambient = 0x050505, diffuse = 0x331100, specular = 0xffffff, shininess = 10, scale = 23;

      // normal map shader

      var shader = THREE.ShaderUtils.lib[ "normal" ];
      var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

      uniforms[ "enableAO" ].value = false;
      uniforms[ "enableDiffuse" ].value = false;
      uniforms[ "enableSpecular" ].value = false;
      uniforms[ "enableReflection" ].value = false;
      uniforms[ "enableDisplacement" ].value = false;

      // uniforms[ "tNormal" ].texture = THREE.ImageUtils.loadTexture( "images/normal_map.png", {}, function() {
                                                                  // animate();
      // });
      // uniforms[ "tAO" ].texture = THREE.ImageUtils.loadTexture( "textures/normal/ninja/ao.jpg" );

      // uniforms[ "tDisplacement" ].texture = THREE.ImageUtils.loadTexture( "textures/normal/ninja/displacement.jpg" );
      // uniforms[ "uDisplacementBias" ].value = - 0.428408;
      // uniforms[ "uDisplacementScale" ].value = 2.436143;

      uniforms[ "uDiffuseColor" ].value.setHex( diffuse );
      uniforms[ "uSpecularColor" ].value.setHex( specular );
      uniforms[ "uAmbientColor" ].value.setHex( ambient );

      uniforms[ "uShininess" ].value = shininess;

      // uniforms[ "tCube" ].texture = reflectionCube;
      uniforms[ "uReflectivity" ].value = 0.1;

      uniforms[ "uDiffuseColor" ].value.convertGammaToLinear();
      uniforms[ "uSpecularColor" ].value.convertGammaToLinear();
      uniforms[ "uAmbientColor" ].value.convertGammaToLinear();

      var parameters = {
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: uniforms,
        lights: true,
        fog: false
      };

      var normal_material = new THREE.ShaderMaterial( parameters );

      var mesh = new THREE.Mesh( geometry, texture_material );
      scene.add( mesh );

      var renderer = new THREE.WebGLRenderer({canvas: canvas});
      renderer.setSize( sample_defaults.width * 1.4, sample_defaults.height * 1.4 );

      function animate() {
        requestAnimationFrame( animate );
        mesh.rotation.y += 0.01;
        renderer.render( scene, camera );
      }
    }
  };
})();
