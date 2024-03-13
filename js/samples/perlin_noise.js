(function() {

  var width = sample_defaults.width * 2;
  var height = sample_defaults.height * 2;
  const { Perlin } = THREE_Noise;

  window.samples.perlin_noise = {

    initialize: function(canvas, options) {
      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera( 75, width / height, 1, 5000 );
      camera.position.z = 100;

      // var geometry = new THREE.TorusGeometry( 15, 15, 30, 30 );
      // var material = new THREE.MeshLambertMaterial( { color: 0xdddddd,  wireframe: true } );

      // var mesh = new THREE.Mesh( geometry, material );
      // mesh.position.y = 35;

      const geometry = new THREE.SphereGeometry(10, 128, 128);
      // const geometry = new THREE.PlaneGeometry(100, 100, 128, 128);
      // const material = new THREE.MeshNormalMaterial({ wireframe: false });
      const material = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: false, shininess: 200, roughness: 2});
      // const material = new THREE.MeshPhongMaterial({ color: 0x0000ff, wireframe: false, shininess: 200, roughness: 2});
      const sphere = new THREE.Mesh(geometry, material);

      const light = new THREE.AmbientLight(0x404040); // soft white light
      scene.add(light);

      const dlight = new THREE.DirectionalLight(0xffffff, 1);
      dlight.position.z = 3
      scene.add(dlight);

      const perlin = new Perlin(Math.random());
      scene.add(sphere);

      const sposition = sphere.geometry.attributes.position.clone();
      const snormal = sphere.geometry.attributes.normal.clone();
      const l = sposition.count;

      var axisHelper = new THREE.AxisHelper(50);
      scene.add( axisHelper );

      var renderer = new THREE.WebGLRenderer({"canvas": canvas});
      renderer.setSize( width, height );

      const controls = new THREE.OrbitControls(camera, renderer.domElement);

      var options = {
        perlin: {
          amplitude: 0.0,
          frequency: 2.0,
          speed: 0.5,

        },
        spin: {
          sinVel: 0.0,
          ampVel: 80.0,
        }

      }
      var gui = new dat.GUI();
      var perlinGUI = gui.addFolder('Setup Perlin Noise');
      perlinGUI.add(options.perlin, 'amplitude', 0.0, 30).name('Amplitude').listen();
      perlinGUI.add(options.perlin, 'frequency', 2, 30).name('Frequency').listen();
      perlinGUI.add(options.perlin, 'speed', 0.5, 5.0).name('Speed');

      perlinGUI.open();

      var instance = { active: false };


      function animate(dt) {
        requestAnimationFrame( animate, canvas );
        controls.update();
        if(!instance.active || sample_defaults.paused) return;


        renderer.render( scene, camera );

        const position = sphere.geometry.attributes.position;
        const normal = sphere.geometry.attributes.normal;

        const p = [];
        for (let i = 0; i < l; i++) {
          const pos = new THREE.Vector3().fromBufferAttribute(sposition, i);
          const norm = new THREE.Vector3().fromBufferAttribute(snormal, i);
          const newPos = pos.clone();

          pos.multiplyScalar(0.3 * options.perlin.frequency);
          pos.x += dt * 0.002 * options.perlin.speed;
          const n = perlin.get3(pos) * options.perlin.amplitude;

          newPos.add(norm.multiplyScalar(n));

          p.push(newPos);
        }

        position.copyVector3sArray(p);

        sphere.geometry.computeVertexNormals();
        sphere.geometry.attributes.position.needsUpdate = true;
      }

      animate();
      return instance;
    }
  };
})();

