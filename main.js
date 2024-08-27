import * as THREE from 'https://cdn.jsdelivr.net/npm/three@v0.167.1/build/three.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

camera.position.set(0, 15, 15);
//camera.lookAt(0, 0, 0);
camera.lookAt(new THREE.Vector3(0, 4, 0));  

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(-10, 10, 10);
scene.add(pointLight);

window.addEventListener('wheel', (event) => {
    const zoomSpeed = 0.5; 
    if (event.deltaY > 0) {
        // scrolling in
		camera.position.y -= zoomSpeed;
        camera.position.z -= zoomSpeed;
    } else if (event.deltaY < 0) {
        // scrolling out
		camera.position.y += zoomSpeed;
        camera.position.z += zoomSpeed;
    }

    camera.position.y = THREE.MathUtils.clamp(camera.position.y, -2, 15); // min max zoom
	camera.position.z = THREE.MathUtils.clamp(camera.position.z, -2, 15); 

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
    mouse.x = (event.clientX / window.innerWidth)*2-0.998;
    mouse.y = - (event.clientY / window.innerHeight)*2+1.14;
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);

    // const direction = raycaster.ray.direction.clone().normalize();
    // const origin = raycaster.ray.origin.clone();
    // const arrowHelper = new THREE.ArrowHelper(direction, origin, 10, 0xff0000);
    // scene.add(arrowHelper);

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
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)'; 
    // popup.style.width = '80%';
     popup.style.height = '80%';
    //popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '2px solid black';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';
    //popup.style.overflow = 'auto';  // Allows scrolling if content overflows
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.display = 'inline-block'; 
    popup.style.padding = '20px';  

    // Create an image element
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';

    img.src = `resume.png`; 
    // Append the image to the popup
    popup.appendChild(img);

    // close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = 'black';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    // append close button to popup
    popup.appendChild(closeButton);

    // for closing even if clicking outside of popup
    document.addEventListener('click', (event) => {
        if (!popup.contains(event.target) && event.target !== closeButton) {
            document.body.removeChild(popup);
        }
    });

    // append the popup to the body
    document.body.appendChild(popup);
}

function openLinkedIn(){
    window.open("https://www.linkedin.com/in/emily-qin/");
}

function openGithub(){
    window.open("https://github.com/emilyqin05");
}


function openPopup(objectName) {
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
    popup.style.overflow = 'auto';  //scrolling
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = 'black';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
    // image 
    const img = document.createElement('img');
    img.src = 'emilyPhoto.JPG';  
    img.alt = objectName;
    img.style.maxWidth = '30%';
    img.style.height = 'auto';
    img.style.marginBottom = '20px';
    // text
    const text = document.createElement('p');
    text.textContent = `Hi! I’m Emily Qin, a second-year Computing Science and Business student at Simon Fraser University. I’m passionate about using technology to create positive change, whether that’s through building software or exploring roles in tech management. I enjoy being in leadership roles where things are always moving and I am pushed out of my comfort zone! As the Events Director for the SFU Computing Science Student Society, I organize hackathons, career panels, and social events while also chairing volunteer meetings. I’m also the Mentorship Program Coordinator for SFU Women in Computing Science, where I empower the WiCS community by helping new members build connections. When I’m not working on these projects, you’ll probably find me hiking around Vancouver, playing volleyball with my little brother, or hanging out with my cat, Duchess. If you’d like to connect or learn more about what I do, please reach out via LinkedIn. I'm always happy to chat, share more, and learn about you!`;
    text.style.textAlign = 'center';
    text.style.fontSize = '18px';
    text.style.lineHeight = '1.5';
    text.style.margin = '0';
    text.style.fontFamily = 'Arial, sans-serif'; 

    // append to popup
    popup.appendChild(closeButton);
    popup.appendChild(img);
    popup.appendChild(text);

    // append the popup to the body
    document.body.appendChild(popup);
}


const loader = new GLTFLoader();
// Load a glTF resource
loader.load('edit5.glb', function (gltf) {
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            if (node.material) {
                node.material.needsUpdate = true;
            }
            if (node.name === 'laptopscreen') {  
                laptop = node;
            }
            if (node.name === 'photoscreen'){
                photo = node;
            }
            if (node.name === 'pencil2'){
                linkedInPen = node;
            }
            if (node.name === 'pencil1'){
                githubPen = node;
            }
            if (node.name === 'resumescreen'){
                resume = node;
            }
        }
    });
	gltf.scene.position.set(0, -14, -15); 
    scene.add(gltf.scene);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
    console.log('An error happened', error);
});
