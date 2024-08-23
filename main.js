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
camera.position.set(0, 15, 15);
camera.lookAt(0, 4, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(-10, 10, 10);
scene.add(pointLight);

// Handle scroll events to zoom in/out
window.addEventListener('wheel', (event) => {
    const zoomSpeed = 0.5; // Adjust this value to control zoom speed
    if (event.deltaY > 0) {
        // Scrolling down - zoom in
		camera.position.y -= zoomSpeed;
        camera.position.z -= zoomSpeed;
    } else if (event.deltaY < 0) {
        // Scrolling up - zoom out
		camera.position.y += zoomSpeed;
        camera.position.z += zoomSpeed;
    }

    // Optional: Clamp the camera's y position to prevent excessive zooming
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, -2, 15); // Adjust min and max values as needed
	camera.position.z = THREE.MathUtils.clamp(camera.position.z, -2, 15); // Adjust min and max values as needed

});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersects = [];
let laptop, photo, linkedInPen, githubPen; 

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object === laptop) {
            openPopup();  // Function to open the popup
        }
        if (object === photo){
            openPopup();
        }
        if (object === linkedInPen){
            openLinkedIn();
        }
        if (object === githubPen){
            openGithub();
        }
    }
});

function openLinkedIn(){
    window.open("https://www.linkedin.com/in/emily-qin/");
}

function openGithub(){
    window.open("https://github.com/emilyqin05");
}

function openPopup() {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.left = '20px';
    popup.style.padding = '10px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.textContent = 'You clicked on the laptop!';
    document.body.appendChild(popup);
}


// Instantiate a loader
const loader = new GLTFLoader();

// // Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load('edit4.glb', function (gltf) {
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            if (node.material) {
                node.material.needsUpdate = true;
            }
            if (node.name === 'laptopscreen') {  // Ensure 'Laptop' matches the name in your Blender file //|| node.name === 'laptop.001'|| node.name === 'laptop.002'
                laptop = node;
            }
            if (node.name === 'photoscreen'){
                photo = node;
            }
            if (node.name === 'linkedin'){
                linkedInPen = node;
            }
            if (node.name === 'github'){
                githubPen = node;
            }
        }
    });
	gltf.scene.position.set(0, -10, -15); // Adjust this to the desired position
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