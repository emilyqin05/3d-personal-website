import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.167.1/build/three.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background color to white
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

// Position the camera
camera.position.set(0, 0.6, 2);
camera.lookAt(0, 0.1, 0);



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

let laptopScreen;

// Load a glTF resource
loader.load('projects1.glb', function (gltf) {
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            if (node.material) {
                node.material.needsUpdate = true;
            }
            if (node.name === 'laptopscreen'){
                laptopScreen = node;
            }
        }
    });
	gltf.scene.position.set(0, 0, 0); // Adjust this to the desired position
    scene.add(gltf.scene);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
    console.log('An error happened', error);
});

