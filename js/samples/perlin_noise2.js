(function() {

  var _width = sample_defaults.width * 2;
  var _height = sample_defaults.height * 2;
  const { Perlin } = THREE_Noise;

var Theme = {_darkred: 0x000000}
  

  window.samples.perlin_noise2 = {

  initialize: function(canvas, options) {
  
  var scene, camera, renderer, container;
  var start = Date.now();


    //---
    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog(Theme._darkred, 8, 20);
    scene.background = new THREE.Color(Theme._darkred);
    //---
    var camera = new THREE.PerspectiveCamera( 75, _width / _height, 1, 10000 );
    camera.position.z = 30;
    //---
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:false, "canvas": canvas, });    
    renderer.setSize(_width, _height);
    //---

    //---
    window.addEventListener('resize', onWindowResize, false);

  
  function onWindowResize() {
    _width = window.innerWidth;
    _height = window.innerHeight;
    renderer.setSize(_width, _height);
    camera.aspect = _width / _height;
    camera.updateProjectionMatrix();
    console.log('- resize -');
  }
  
  //--------------------------------------------------------------------
  
  var mat;
  var primitiveElement = function() {
    this.mesh = new THREE.Object3D();
    mat = new THREE.ShaderMaterial( {
      wireframe: false,
      //fog: true,
      uniforms: {
        time: {
          type: "f",
          value: 0.0
        },
        pointscale: {
          type: "f",
          value: 0.0
        },
        decay: {
          type: "f",
          value: 0.0
        },
        complex: {
          type: "f",
          value: 0.0
        },
        waves: {
          type: "f",
          value: 0.0
        },
        eqcolor: {
          type: "f",
          value: 0.0
        },
        fragment: {
          type: "i",
          value: true
        },
        redhell: {
          type: "i",
          value: true
        }
      },
      vertexShader: document.getElementById( 'vertexShaderPerlin2' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShaderPerlin2' ).textContent
    });
    var geo = new THREE.IcosahedronBufferGeometry(3, 7);
    var mesh = new THREE.Points(geo, mat);
  
    this.mesh.add(mesh);
  }
  
  var _primitive;

    _primitive = new primitiveElement();
    scene.add(_primitive.mesh);

  
  //--------------------------------------------------------------------
  
  var options = {
    perlin: {
      vel: 0.002,
      speed: 0.00050,
      perlins: 1.0,
      decay: 0.10,
      complex: 0.30,
      waves: 20.0,
      eqcolor: 11.0,
      fragment: true,
      redhell: true
    },
    spin: {
      sinVel: 0.0,
      ampVel: 80.0,
    }
  }
  

    var gui = new dat.GUI();
    var camGUI = gui.addFolder('Camera');
    //cam.add(, 'speed', 0.0, 30.00).listen();
    camGUI.add(camera.position, 'z', 3, 20).name('Zoom').listen();
    camGUI.add(options.perlin, 'vel', 0.000, 0.02).name('Velocity').listen();
    //camGUI.open();
    
    var mathGUI = gui.addFolder('Math Options');
    mathGUI.add(options.spin, 'sinVel', 0.0, 0.50).name('Sine').listen();
    mathGUI.add(options.spin, 'ampVel', 0.0, 90.00).name('Amplitude').listen();
    //mathGUI.open();
    
    var perlinGUI = gui.addFolder('Setup Perlin Noise');
    perlinGUI.add(options.perlin, 'perlins', 1.0, 5.0).name('Size').step(1);
    perlinGUI.add(options.perlin, 'speed', 0.00000, 0.00050).name('Speed').listen();
    perlinGUI.add(options.perlin, 'decay', 0.0, 1.00).name('Decay').listen();
    perlinGUI.add(options.perlin, 'waves', 0.0, 20.00).name('Waves').listen();
    perlinGUI.add(options.perlin, 'fragment', true).name('Fragment');
    perlinGUI.add(options.perlin, 'complex', 0.1, 1.00).name('Complex').listen();
    perlinGUI.add(options.perlin, 'redhell', true).name('Electroflow');
    perlinGUI.add(options.perlin, 'eqcolor', 0.0, 15.0).name('Hue').listen();
    perlinGUI.open();

  
  //--------------------------------------------------------------------
  var instance = { active: false };
  function animate() {
    requestAnimationFrame(animate, canvas);
    var performance = Date.now() * 0.003;
    if(!instance.active || sample_defaults.paused) return;
    _primitive.mesh.rotation.y += options.perlin.vel;
    _primitive.mesh.rotation.x = (Math.sin(performance * options.spin.sinVel) * options.spin.ampVel )* Math.PI / 180;
    //---
    mat.uniforms['time'].value = options.perlin.speed * (Date.now() - start);
    mat.uniforms['pointscale'].value = options.perlin.perlins;
    mat.uniforms['decay'].value = options.perlin.decay;
    mat.uniforms['complex'].value = options.perlin.complex;
    mat.uniforms['waves'].value = options.perlin.waves;
    mat.uniforms['eqcolor'].value = options.perlin.eqcolor;
    mat.uniforms['fragment'].value = options.perlin.fragment;
    mat.uniforms['redhell'].value = options.perlin.redhell;
    //---
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animate();
  return instance;
    }
  }
})();

