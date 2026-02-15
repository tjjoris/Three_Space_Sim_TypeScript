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
import VJoyUsedTracker from './ui/vjoy/vJoyUsedTracker.ts'
import Axis from './axes/axis.ts';
import DustHandler from './spaceDust/dustHandler.ts'
import Mover from './ship/movement/mover.ts'
import CameraRig from './camera/cameraRig.ts'
import AxisToMoverRig from './axes/axisToMoverRig.ts';
import PowerUp from './powerUps/powerUp.ts'
import teleportPowerUp from './powerUps/teleportPowerUp.ts';
import PowerUpFactory from './powerUps/powerUpFactory.ts'
import PowerUpTicker from './powerUps/powerUpTicker.ts'

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
export const setRendererSize = new SetRendererSize(renderer, camera);

let started = false;

export function setVerticalInversion(value: boolean) {
  mover?.setVerticalInversion(value);
}

export function start(container: HTMLElement) {
  if (started) return;
  started = true;

  //add renderer canvas to provided conatiner
  container.appendChild(renderer.domElement);
  //attach resize listener
  const resizeHandler = () => setRendererSize.setSize();
  window.addEventListener('resize', resizeHandler);
  setRendererSize.setSize();
  //remember the handler so we can remove it later
  //i will convert this to a class variable.
  (start as any)._resizeHandler = resizeHandler;

  //start the render loop
  renderer.setAnimationLoop(animate);
}

export function stop() {
  if (!started) return;
  started = false;

  //stop loop
  renderer.setAnimationLoop(null);

  //remove canvas
  if (renderer.domElement.parentElement) {
    renderer.domElement.parentElement.removeChild(renderer.domElement);
  }

  //remove resize listener
  const resizeHandler = (start as any)._resizeHandler;
  if (resizeHandler) window.removeEventListener('resize', resizeHandler);
}

//add event listener for resize
// window.addEventListener("resize", () => setRendererSize.setSize());

//removed append because doing it differently with react.
// document.body.appendChild(renderer.domElement);



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



//create powerup factory
const powerUpFactory = new PowerUpFactory(scene);
let powerUps: PowerUp[] = [];
powerUps.push(powerUpFactory.createPowerUpOnMover());
teleportPowerUp(powerUps[0], mover, 5);
const powerUpTicker = new PowerUpTicker(mover, 1);
powerUpTicker.addPowerUp(powerUps[0]);


let tickables: Tickable[] = [];
tickables.push(leftVJoyUpdater as Tickable);
tickables.push(rightVJoyUpdater as Tickable);
tickables.push(cameraRig as Tickable);
tickables.push(axisToMoverRig as Tickable);
tickables.push(mover as Tickable);
tickables.push(dustHandler as Tickable);
tickables.push(powerUpTicker as Tickable);

let currentTime = Date.now();
function animate() {

  const deltaTime = Date.now() - currentTime;
  currentTime = Date.now();
  const dtMult: number = deltaTime * 0.0025;

  tickables.forEach(tick => { tick.tick(dtMult); }); // assuming 60 FPS, so ~16ms per frame
  renderer.render(scene, camera);
}

// renderer.setAnimationLoop(animate);