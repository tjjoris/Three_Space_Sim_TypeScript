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
const leftVJoyUpdater = new VJoyUpdater(leftVJoyFactory.getVJoySprite()!, camera, -14.9, 3.2);


//cast ray for inputs to vjoy
const castRay = new CastRay(renderer, camera);

//new inputs
const multiTouch = new MultiTouch(renderer);
multiTouch;
const clickInput = new ClickInput(renderer, leftVJoyUpdater, castRay);
clickInput;



//add to scene
scene.add(cube);

let tickables: Tickable[] = [];
tickables.push(leftVJoyUpdater as Tickable);
camera.position.z = 5;

function animate() {
  tickables.forEach(tick => { tick.tick(0.016); }); // assuming 60 FPS, so ~16ms per frame
  let newVJoyPoint = castRay.castRay(new THREE.Vector2(clickInput.getPoint().x, clickInput.getPoint().y));
  // console.log("new vjoy point ", newVJoyPoint);
  // leftVJoyUpdater.setPoint(new THREE.Vector2(newVJoyPoint.x, newVJoyPoint.y));
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);