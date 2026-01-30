import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
import * as THREE from 'three'
import SetRendererSize from './game/setRendererSize.ts'
import VJoyFactory from './ui/vjoy/vjoyFactory.ts'
import VJoyUpdater from './ui/vjoy/vjoyUpdater.ts'
import type { Tickable } from './game/tickable.ts'
import MultiTouch from './axes/multiTouch.ts'
import ClickInput from './axes/clickInput.ts'
import CastRay from './axes/castRay.ts'
// import VJoyInput from './ui/vjoy/vJoyInput.ts'
import RightVJoyInput from './ui/vjoy/rightVJoyInput.ts'
import LeftVJoyInput from './ui/vjoy/leftVJoyInput.ts'
import Axis from './axes/axis.ts';
import DustHandler from './spaceDust/dustHandler.ts'
import Mover from './ship/movement/mover.ts'
import CameraRig from './camera/cameraRig.ts'
import AxisToMoverRig from './axes/axisToMoverRig.ts';

const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//mover for camera (ship)
const mover = new Mover();
//camera rig.
const cameraRig = new CameraRig(camera, mover);


const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

//class for setting the renderer size on window resize.
const setRendererSize = new SetRendererSize(renderer, camera);
window.addEventListener("resize", () => setRendererSize.setSize());

document.body.appendChild(renderer.domElement);

//new box
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);


//new vjoy factory
const leftVJoyFactory = new VJoyFactory(scene);
const rightVJoyFactory = new VJoyFactory(scene);


//cast ray for inputs to vjoy
const castRay = new CastRay(renderer, camera);

//new axes
const pitchAxis = new Axis();
const rollAxis = new Axis();
const verticalAxis = new Axis();
const horizontalAxis = new Axis();

//axis to mover rig for linking axes to player mover
const axisToMoverRig: AxisToMoverRig = new AxisToMoverRig(mover, pitchAxis, rollAxis, verticalAxis, horizontalAxis);

//new inputs

const leftVJoyInput = new LeftVJoyInput(renderer, 1, 1, horizontalAxis, verticalAxis);
const rightVJoyInput = new RightVJoyInput(renderer, 1, 1, rollAxis, pitchAxis);
rightVJoyInput;
const clickInput = new ClickInput(renderer, leftVJoyInput, rightVJoyInput);
clickInput;
const multiTouch = new MultiTouch(renderer, leftVJoyInput, rightVJoyInput);
multiTouch;
const rightVJoyUpdater = new VJoyUpdater(rightVJoyFactory.getVJoySprite()!, camera, castRay, rightVJoyInput);
const leftVJoyUpdater = new VJoyUpdater(leftVJoyFactory.getVJoySprite()!, camera, castRay, leftVJoyInput);


//create space dust
const dustHandler = new DustHandler(mover, scene);
//create initial space dust.
dustHandler.initiateDustField(800);


//add to scene
scene.add(cube);

let tickables: Tickable[] = [];
tickables.push(leftVJoyUpdater as Tickable);
tickables.push(rightVJoyUpdater as Tickable);
tickables.push(cameraRig as Tickable);
tickables.push(axisToMoverRig as Tickable);
tickables.push(mover as Tickable);
tickables.push(dustHandler as Tickable);


function animate() {
  // setRendererSize.checkAndSetSize();
  tickables.forEach(tick => { tick.tick(0.016); }); // assuming 60 FPS, so ~16ms per frame
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);