import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

// Position the camera
camera.position.set = (0, 20, 20);
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(-10, 10, 10);
scene.add(pointLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();


// Instantiate a loader
const loader = new GLTFLoader();

// // Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load('edit3.glb', function (gltf) {
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            if (node.material) {
                node.material.needsUpdate = true;
            }
        }
    });
    scene.add(gltf.scene);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
    console.log('An error happened', error);
});
/*
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}

*/