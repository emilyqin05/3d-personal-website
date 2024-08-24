import * as THREE from 'three';
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
let laptop, photo, linkedInPen, githubPen, resume; 

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object === laptop) {
            //function to change to a different camera
            window.location.href = "projects.html";
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
        if (object === resume){
            openResume();
        }
        
    }
});

function openResume(){
    // Create the popup container
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '10%';
    popup.style.left = '10%';
    popup.style.width = '80%';
    popup.style.height = '80%';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '2px solid black';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';
    popup.style.overflow = 'auto';  // Allows scrolling if content overflows
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';

    // Create an image element
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';

    // Set the image source based on the object name
    img.src = `emilyPhoto.JPG`; // Assuming images are stored in the 'images' folder

    // Append the image to the popup
    popup.appendChild(img);

    // Create and style the close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    // Append the close button to the popup
    popup.appendChild(closeButton);

    // Append the popup to the body
    document.body.appendChild(popup);
}

function openLinkedIn(){
    window.open("https://www.linkedin.com/in/emily-qin/");
}

function openGithub(){
    window.open("https://github.com/emilyqin05");
}

// function openPopup() {
//     const popup = document.createElement('div');
//     popup.style.position = 'fixed';
//     popup.style.top = '20px';
//     popup.style.left = '20px';
//     popup.style.padding = '10px';
//     popup.style.backgroundColor = 'white';
//     popup.style.border = '1px solid black';
//     popup.textContent = 'You clicked on the laptop!';
//     document.body.appendChild(popup);
// }



function openPopup(objectName) {
    // Create the popup container
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '10%';
    popup.style.left = '10%';
    popup.style.width = '80%';
    popup.style.height = '80%';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '2px solid black';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';
    popup.style.overflow = 'auto';  // Allows scrolling if content overflows
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';

    // Create and style the close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#f44336';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    // Add an image
    const img = document.createElement('img');
    img.src = 'emilyPhoto.JPG';  // Replace with your image path
    img.alt = objectName;
    img.style.maxWidth = '30%';
    img.style.height = 'auto';
    img.style.marginBottom = '20px';

    // Add text content
    const text = document.createElement('p');
    text.textContent = `This is the about page. Here you can add any information related to it.`;
    text.style.textAlign = 'center';
    text.style.fontSize = '18px';
    text.style.lineHeight = '1.5';
    text.style.margin = '0';

    // Append elements to the popup
    popup.appendChild(closeButton);
    popup.appendChild(img);
    popup.appendChild(text);

    // Append the popup to the body
    document.body.appendChild(popup);
}



// Instantiate a loader
const loader = new GLTFLoader();

// // Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load('edit5.glb', function (gltf) {
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
            if (node.name === 'resumescreen'){
                resume = node;
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
