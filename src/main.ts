import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
import * as THREE from 'three'
import VJoyFactory from './ui/vjoy/vjoyFactory.ts'

document.querySelector<HTMLImageElement>('#app')!.src = "./public/circle map.png"

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//new box
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

//new vjoy factory
const leftVJoyFactory = new VJoyFactory(scene);

scene.add(cube);

camera.position.z = 5;

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);