import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
import * as THREE from 'three'
import VJoyFactory from './ui/vjoy/vJoyFactory.ts'
import VJoyUpdater from './ui/vjoy/vJoyUpdater.ts'
import type { Tickable } from './game/tickable.ts'
import MultiTouch from './axes/multiTouch.ts'
import ClickInput from './axes/clickInput.ts'
import CastRay from './axes/castRay.ts'
import VJoyInput from './ui/vjoy/vJoyInput.ts'

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


//cast ray for inputs to vjoy
const castRay = new CastRay(renderer, camera);

//new inputs
const multiTouch = new MultiTouch(renderer);
multiTouch;
const rightVJoyInput = new VJoyInput(renderer, new THREE.Vector2(300, 200), 1);
rightVJoyInput;
const clickInput = new ClickInput(renderer, rightVJoyInput);
clickInput;

const rightVJoyUpdater = new VJoyUpdater(leftVJoyFactory.getVJoySprite()!, camera, castRay, rightVJoyInput, 0, 0);



//add to scene
scene.add(cube);

let tickables: Tickable[] = [];
tickables.push(rightVJoyUpdater as Tickable);
camera.position.z = 5;

function animate() {
  camera.rotateX(0.01);
  tickables.forEach(tick => { tick.tick(0.016); }); // assuming 60 FPS, so ~16ms per frame
  renderer.render(scene, camera);
}

// import CalcX1UsingPointSlopeForm from './helpers/calcX1UsingPointSlopeForm';
// import CalcY1UsingPointSlopeForm from './helpers/calcY1UsingPointSlopeForm'
import calcSlope from './helpers/calcSlope';
let pos1 = new THREE.Vector2(0, 0);
let pos2 = new THREE.Vector2(1, 0);
console.log("calc slope is ", calcSlope(pos1, pos2));

renderer.setAnimationLoop(animate);