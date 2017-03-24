var socket;
socket= io.connect('http://localhost:3002');
socket.on('user data',newData);
function newData(data){
  console.log('all data recieved in animation js',data);
}

var count;

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();



var container, stats;
var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, sprite, size;
var sprites=[];
var mouseX = 0, mouseY = 0;
var listener;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var clock = new THREE.Clock();
var analyser1, analyser2, analyser3;
var colors=[[1.0, 0.2, 0.5],[0.95, 0.1, 0.5],[0.90, 0.05, 0.5],[0.85, 0, 0.5],[0.80, 0, 0.5]];
var sizes=[50,15,10,8,5];
var audioLoader;
var textures=["textures/smoke1.png","textures/oil drop.png","textures/light_1.png","textures/drop.png","textures/smoke_2.png"];
// var listener = new THREE.AudioListener();
// camera.add( listener );
// var sound = new THREE.PositionalAudio( listener );
// var audioLoader = new THREE.AudioLoader();
// audioLoader.load( 'sounds/song.ogg', function( buffer ) {
// 	sound1.setBuffer( buffer );
// 	sound1.setRefDistance( 80 );
// 	sound1.play();
// });
$.getJSON( "/all").done(function( data ) {
  count=data.count;
  console.log("count in animation js",count);
  init();
  animate();
});
//
// init();
// animate();

function init() {
  console.log("init");

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 500;
  //Create an AudioListener and add it to the camera
  listener = new THREE.AudioListener();
  camera.add( listener );

  //Create the PositionalAudio object (passing in the listener)
  var sounds=[];

  // var sound1 = new THREE.PositionalAudio( listener );
  // var sound2 = new THREE.PositionalAudio( listener );
  // var sound3 = new THREE.PositionalAudio( listener );
  // var sound4 = new THREE.PositionalAudio( listener );
  // var sound5 = new THREE.PositionalAudio( listener );
  //Load a sound and set it as the PositionalAudio object's buffer
  audioLoader = new THREE.AudioLoader();

  for (var i=0;i<count;i++){
    console.log("sounds");
    sounds[i]=new THREE.PositionalAudio( listener );
    audioLoader.load( 'sounds/11.mp3', function( buffer ) {
      console.log("enter buffer");
      sounds[i].setBuffer( buffer );
      sounds[i].setLoop(true);
      sounds[i].setRefDistance( 20 );
      sounds[i].play();
    });
    // loadEachSound(i,sounds[i]);
  }

  // audioLoader.load( 'sounds/11.mp3', function( buffer ) {
  // 	sound1.setBuffer( buffer );
  //   sound1.setLoop(true);
  // 	sound1.setRefDistance( 20 );
  // 	sound1.play();
  // });
  //
  // audioLoader.load( 'sounds/22.mp3', function( buffer ) {
  // 	sound2.setBuffer( buffer );
  //   sound2.setLoop(true);
  // 	sound2.setRefDistance( 20 );
  // 	sound2.play();
  // });
  //
  // audioLoader.load( 'sounds/33.mp3', function( buffer ) {
  // 	sound3.setBuffer( buffer );
  //   sound3.setLoop(true);
  // 	sound3.setRefDistance( 20 );
  // 	sound3.play();
  // });
  //
  // audioLoader.load( 'sounds/4.mp3', function( buffer ) {
  // 	sound4.setBuffer( buffer );
  //   sound4.setLoop(true);
  //   sound4.setVolume(0.5);
  // 	sound4.setRefDistance( 20 );
  // 	sound4.play();
  // });
  //
  // audioLoader.load( 'sounds/5.mp3', function( buffer ) {
  // 	sound5.setBuffer( buffer );
  //   sound5.setLoop(true);
  // 	sound5.setRefDistance( 20 );
  // 	sound5.play();
  // });

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );

  geometry = new THREE.Geometry();
  var textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = '';

  for (var i=0;i<count;i++){
    sprites[i]=textureLoader.load(textures[parseInt(Math.random()*5)]);
    console.log(sprites[i]);
  }
  // sprite1 = textureLoader.load( "textures/smoke1.png" );
  // sprite2 = textureLoader.load( "textures/oil drop.png" );
  // sprite3 = textureLoader.load( "textures/light_1.png" );
  // sprite4 = textureLoader.load( "textures/drop.png" );
  // sprite5 = textureLoader.load( "textures/smoke_2.png" );
  //
  // sprite1 = textureLoader.load( "textures/snowflake1.png" );
  // sprite2 = textureLoader.load( "textures/snowflake2.png" );
  // sprite3 = textureLoader.load( "textures/snowflake3.png" );
  // sprite4 = textureLoader.load( "textures/snowflake4.png" );
  // sprite5 = textureLoader.load( "textures/snowflake5.png" );

  for ( i = 0; i < 3; i ++ ) {

    var vertex = new THREE.Vector3();

    vertex.x = Math.random() * 1000 - 500;
    vertex.y = Math.random() * 1000 - 500;
    vertex.z = Math.random() * 2000 - 1000;

    // vertex.x = Math.random() * 2000 - 1000;
    // vertex.y = Math.random() * 2000 - 1000;
    // vertex.z = Math.random() * 2000 - 1000;

    geometry.vertices.push( vertex );

  }
  parameters=[];
  for (var i=0;i<count;i++){
    parameters.push([colors[parseInt(Math.random()*5)],sprites[i],sizes[parseInt(Math.random()*5)],sounds[i]]);
  }
  // parameters = [
  //   [ [1.0, 0.2, 0.5], sprite2, 50 ,sound2],
  //   [ [0.95, 0.1, 0.5], sprite3, 15,sound3 ],
  //   [ [0.90, 0.05, 0.5], sprite1, 10 ,sound1],
  //   [ [0.85, 0, 0.5], sprite5, 8 ,sound5],
  //   [ [0.80, 0, 0.5], sprite4, 5 ,sound4]
  // ];

  for ( i = 0; i < count; i ++ ) {

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

  // analyser1 = new THREE.AudioAnalyser( sound1, 32 );
  // analyser2 = new THREE.AudioAnalyser( sound2, 32 );
  // analyser3 = new THREE.AudioAnalyser( sound3, 32 );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  controls = new THREE.FirstPersonControls( camera, renderer.domElement );

  controls.movementSpeed = 200;
  controls.lookSpeed = 0.05;
  controls.noFly = true;
  controls.lookVertical = false;

  window.addEventListener( 'resize', onWindowResize, false );

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

  var delta = clock.getDelta();

  controls.update( delta );

  var time = Date.now() * 0.00005;

  //camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  //camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

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

// audioLoader.load( 'sounds/4.mp3', function( buffer ) {
// 	sound4.setBuffer( buffer );
//   sound4.setLoop(true);
//   sound4.setVolume(0.5);
// 	sound4.setRefDistance( 20 );
// 	sound4.play();
// });
function loadEachSound(soundName,soundEle){
  audioLoader.load( 'sound/'+soundName+'.mp3', function( buffer ) {
    soundEle.setBuffer( buffer );
    soundEle.setLoop(true);
    soundEle.setRefDistance( 20 );
    soundEle.play();
  });
}
