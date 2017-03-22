if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;
var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, sprite, size;
var mouseX = 0, mouseY = 0;
var listener;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// var listener = new THREE.AudioListener();
// camera.add( listener );
// var sound = new THREE.PositionalAudio( listener );
// var audioLoader = new THREE.AudioLoader();
// audioLoader.load( 'sounds/song.ogg', function( buffer ) {
// 	sound1.setBuffer( buffer );
// 	sound1.setRefDistance( 80 );
// 	sound1.play();
// });

init();
animate();

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 500;
  //Create an AudioListener and add it to the camera
listener = new THREE.AudioListener();
camera.add( listener );

//Create the PositionalAudio object (passing in the listener)
var sound1 = new THREE.PositionalAudio( listener );
var sound2 = new THREE.PositionalAudio( listener );
var sound3 = new THREE.PositionalAudio( listener );
var sound4 = new THREE.PositionalAudio( listener );
var sound5 = new THREE.PositionalAudio( listener );
//Load a sound and set it as the PositionalAudio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/1.mp3', function( buffer ) {
	sound1.setBuffer( buffer );
	sound1.setRefDistance( 20 );
	sound1.play();
});

audioLoader.load( 'sounds/2.mp3', function( buffer ) {
	sound2.setBuffer( buffer );
	sound2.setRefDistance( 20 );
	sound2.play();
});

audioLoader.load( 'sounds/3.mp3', function( buffer ) {
	sound3.setBuffer( buffer );
	sound3.setRefDistance( 20 );
	sound3.play();
});

audioLoader.load( 'sounds/4.mp3', function( buffer ) {
	sound4.setBuffer( buffer );
	sound4.setRefDistance( 20 );
	sound4.play();
});

audioLoader.load( 'sounds/5.mp3', function( buffer ) {
	sound5.setBuffer( buffer );
	sound5.setRefDistance( 20 );
	sound5.play();
});

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );

  geometry = new THREE.Geometry();
  var textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = '';

  sprite1 = textureLoader.load( "textures/smoke1.png" );
  sprite2 = textureLoader.load( "textures/oil drop.png" );
  sprite3 = textureLoader.load( "textures/light_1.png" );
  sprite4 = textureLoader.load( "textures/drop.png" );
  sprite5 = textureLoader.load( "textures/smoke_2.png" );

  // sprite1 = textureLoader.load( "textures/snowflake1.png" );
  // sprite2 = textureLoader.load( "textures/snowflake2.png" );
  // sprite3 = textureLoader.load( "textures/snowflake3.png" );
  // sprite4 = textureLoader.load( "textures/snowflake4.png" );
  // sprite5 = textureLoader.load( "textures/snowflake5.png" );

  for ( i = 0; i < 10; i ++ ) {

    var vertex = new THREE.Vector3();

    vertex.x = Math.random() * 1000 - 500;
    vertex.y = Math.random() * 1000 - 500;
    vertex.z = Math.random() * 2000 - 1000;

    // vertex.x = Math.random() * 2000 - 1000;
    // vertex.y = Math.random() * 2000 - 1000;
    // vertex.z = Math.random() * 2000 - 1000;

    geometry.vertices.push( vertex );

  }

  parameters = [
    [ [1.0, 0.2, 0.5], sprite2, 50 ,sound2],
    [ [0.95, 0.1, 0.5], sprite3, 15,sound3 ],
    [ [0.90, 0.05, 0.5], sprite1, 10 ,sound1],
    [ [0.85, 0, 0.5], sprite5, 8 ,sound5],
    [ [0.80, 0, 0.5], sprite4, 5 ,sound4]
  ];

  for ( i = 0; i < parameters.length; i ++ ) {

    color  = parameters[i][0];
    sprite = parameters[i][1];
    size   = parameters[i][2];

    materials[i] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
    materials[i].color.setHSL( color[0], color[1], color[2] );

    particles = new THREE.Points( geometry, materials[i] );

    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;

    scene.add( particles );
    particles.add( parameters[i][3]);

  }

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  stats = new Stats();
  container.appendChild( stats.dom );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

function onDocumentTouchMove( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

//

function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

function render() {

  var time = Date.now() * 0.00005;

  camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

  camera.lookAt( scene.position );

  for ( i = 0; i < scene.children.length; i ++ ) {

    var object = scene.children[ i ];

    if ( object instanceof THREE.Points ) {

      object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

    }

  }

  for ( i = 0; i < materials.length; i ++ ) {

    color = parameters[i][0];

    h = ( 360 * ( color[0] + time ) % 360 ) / 360;
    materials[i].color.setHSL( h, color[1], color[2] );

  }

  renderer.render( scene, camera );

}
