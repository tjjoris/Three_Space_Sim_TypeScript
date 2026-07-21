import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
import * as THREE from 'three'
import SetRendererSize from './game/setRendererSize.ts'
import VJoyFactory from './ui/vjoy/vjoyFactory.ts'
import VJoyUpdater from './ui/vjoy/vjoyUpdater.ts'
import type Tickable from './game/tickable.ts'
import MultiTouch from './axes/multiTouch.ts'
import ClickInput from './axes/clickInput.ts'
import CastRay from './axes/castRay.ts'
// import VJoyInput from './ui/vjoy/vJoyInput.ts'
import RightVJoyInput from './ui/vjoy/rightVJoyInput.ts'
import LeftVJoyInput from './ui/vjoy/leftVJoyInput.ts'
import Axis from './axes/axis.ts';
import InputsFactory from "./input/inputsFactory";
import DustHandler from './spaceDust/dustHandler.ts'
import Mover from './ship/movement/mover.ts'
import CameraRig from './camera/cameraRig.ts'
import PowerUp from './powerUps/powerUp.ts'
import teleportPowerUp from './powerUps/teleportPowerUp.ts';
import PowerUpFactory from './powerUps/powerUpFactory.ts'
import PowerUpTicker from './powerUps/powerUpTicker.ts'
// import AxialThrust from './ship/movement/axialThrust.ts'
import MomentumManager from './ship/movement/momentumManager.ts'
import MovementMediator from './ship/movement/movementMediator.ts'
import SpeedLimiter from './ship/movement/speedLimiter.ts'
import AxisToAccelerationMediator from './ship/movement/axisToAccelerationMediator.ts'
import SmartYaw from './axes/smartYaw.ts'
import DesiredAxis from './ship/movement/desiredAxis.ts'
import Jerker from './ship/movement/Jerker.ts'
import RotationMediator from './ship/movement/rotationMediator.ts'
import SmartForward from "./ship/movement/smartForward.ts"
import GamePadHandler from './axes/gamePadHandler.ts'
import GamePadHandlerLifeCycleMediator from './axes/GamePadHandlerLifecycleMediator.ts'
import Ticker from './game/ticker.ts'



//get the feedback id div element for debugging;
// const feedbackEl = document.getElementById("feedback");
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
//deadzone, saturation, inverse.
const pitchAxis = new Axis(0.15, 1, true);
const yawAxis = new Axis(0, 1, true);
const rollAxis = new Axis(0.2, 1, false);
const verticalAxis = new Axis(0.15, 1, true);
const horizontalAxis = new Axis(0.15, 1, true);
const forwardAxis = new Axis(0.15, 1, false);

//desired axes, set the min and max rotation speeds.
const desiredPitchAxis = new DesiredAxis(-0.20, 0.20);
const desiredYawAxis = new DesiredAxis(-0.15, 0.15);
const desiredRollAxi = new DesiredAxis(-0.25, 0.25);

//desired axes set to min and max thrust speeds.
const desiredVerticalAxis = new DesiredAxis(-1.5, 1.1);
const desiredHorizontalAxis = new DesiredAxis(-1.5, 1.5);
const desiredForwardAxis = new DesiredAxis(-2.1, 0.5);

//create jerk classes for rotation:
const pitchJerkIncrease = new Jerker(0.15);
const pitchJerkDecrease = new Jerker(-0.15);
const yawJerkIncrease = new Jerker(0.3);
const yawJerkDecrease = new Jerker(-0.3);
const rollJerkIncrease = new Jerker(0.3);
const rollJerkDecrease = new Jerker(-0.3);

//create jerk classes for translational movement:
const verticalJerkIncrease = new Jerker(1.3);
const verticalJerkDecrease = new Jerker(-1.3);
const horizontalJerkIncrease = new Jerker(1.3);
const horizontalJerkDecrease = new Jerker(-1.3);
const forwardJerkIncrease = new Jerker(1.3);
const forwardJerkDecrease = new Jerker(-1.3);

//smart yaw
const smartYaw: SmartYaw = new SmartYaw(0.1, 0.3, 0, 0.3, pitchAxis, rollAxis, verticalAxis, horizontalAxis);

//function to invert axis
export function setVerticalInversion(value: boolean) {
  verticalAxis?.setInverseFromBoolean(value);
}

//inputs factory for creating joys bindings and setting modules:
const inputsFactory = new InputsFactory(pitchAxis, rollAxis, verticalAxis, horizontalAxis);
//calling it to remove syntax error.
inputsFactory;

//new inputs

const leftVJoyInput = new LeftVJoyInput(renderer, 1, 1, horizontalAxis, verticalAxis);
const rightVJoyInput = new RightVJoyInput(renderer, 1, 1, rollAxis, pitchAxis);
rightVJoyInput;
const clickInput = new ClickInput(renderer, leftVJoyInput, rightVJoyInput);
clickInput;
const multiTouch = new MultiTouch(renderer, leftVJoyInput, rightVJoyInput);
multiTouch;
let rightVJoyUpdater: VJoyUpdater | null = new VJoyUpdater(rightVJoyFactory.getVJoySprite()!, camera, castRay, rightVJoyInput);
let leftVJoyUpdater: VJoyUpdater | null = new VJoyUpdater(leftVJoyFactory.getVJoySprite()!, camera, castRay, leftVJoyInput);

//todo delete these
//Axial thrusts
// const horizontalAxialThrust = new AxialThrust(0.10, 0.05, 0.05);
// const verticalAxialThrust = new AxialThrust(0.10, 0.05, 0.05);
// const forwardAxialThrust = new AxialThrust(0.15, 0.05, 0.05);


//smart forward
const smartForward = new SmartForward(verticalAxis, horizontalAxis, forwardAxis);
//translational movmement:
//thrust mediators:
const verticalMediator: AxisToAccelerationMediator = new AxisToAccelerationMediator(verticalAxis, desiredVerticalAxis, mover, null, verticalJerkIncrease, verticalJerkDecrease);
const horizontalMediator: AxisToAccelerationMediator = new AxisToAccelerationMediator(horizontalAxis, desiredHorizontalAxis, mover, null, horizontalJerkIncrease, horizontalJerkDecrease);
const forwardMediator: AxisToAccelerationMediator = new AxisToAccelerationMediator(forwardAxis, desiredForwardAxis, mover, null, forwardJerkIncrease, forwardJerkDecrease);
//speed limiter
const speedLimiter = new SpeedLimiter(0.5);
//Momentum Manager
const momentumManager = new MomentumManager(0.5, speedLimiter);
//Movement Mediator 
const movementMediator = new MovementMediator(momentumManager, mover, verticalMediator, horizontalMediator, forwardMediator, smartForward);

//rotation:
//rotation manager
// const rotationManager = new RotationManager();
const pitchMediator = new AxisToAccelerationMediator(pitchAxis, desiredPitchAxis, mover, null, pitchJerkIncrease, pitchJerkDecrease);
const rollMediator = new AxisToAccelerationMediator(rollAxis, desiredRollAxi, mover, null, rollJerkIncrease, rollJerkDecrease);
const yawMediator = new AxisToAccelerationMediator(yawAxis, desiredYawAxis, mover, smartYaw, yawJerkIncrease, yawJerkDecrease);

//todo rename RotationMediator class.
//rotation mediator
const rotationMediator = new RotationMediator(pitchMediator, rollMediator, yawMediator,
  mover);


/**
 * gamepad
 */

let gamePadHandlerHorizontal: GamePadHandler | null = null;
let gamePadHandlerVertical: GamePadHandler | null = null;
let gamePadHandlerPitch: GamePadHandler | null = null;
let gamePadHandlerRoll: GamePadHandler | null = null;



// window.addEventListener("gamepadconnected", (e) => {
//   console.log(
//     "gamepad connected at index %d: %s, %d buttons, %d axes.",
//     e.gamepad.index,
//     e.gamepad.id,
//     e.gamepad.buttons.length,
//     e.gamepad.axes.length
//   );
//   gamePadHandlerHorizontal = new GamePadHandler(e.gamepad.index, horizontalAxis, 0);
//   if (leftVJoyUpdater !== null) {
//     // let filteredTickables = tickables.filter(tickable => tickable !== leftVJoyUpdater);
//     ticker.removeTickable(leftVJoyUpdater as Tickable);
//     leftVJoyUpdater = null;
//     // tickables = filteredTickables;
//   }


//   // tickables.push(gamePadHandlerHorizontal as Tickable);
//   ticker.addTickable(gamePadHandlerHorizontal as Tickable);
//   // console.log("tickables", tickables);
// });


// window.addEventListener("gamepaddisconnected", (e) => {
//   console.log(
//     "Gamepad disconnected from index %d: %s",
//     e.gamepad.index,
//     e.gamepad.id,
//   );
//   if (gamePadHandlerHorizontal !== null) {
//     // let filteredTickables = tickables.filter(tickable => tickable !== gamePadHandlerHorizontal);
//     // tickables = filteredTickables;
//     ticker.removeTickable(gamePadHandlerHorizontal as Tickable);
//     gamePadHandlerHorizontal = null;
//     // console.log("left vjoy input ", leftVJoyInput);
//     if (leftVJoyInput !== null) {
//       leftVJoyUpdater = new VJoyUpdater(leftVJoyFactory.getVJoySprite()!, camera, castRay, leftVJoyInput);
//       // tickables.push(leftVJoyUpdater as Tickable);
//       ticker.addTickable(leftVJoyUpdater as Tickable);
//       console.log("left vjoy input re-enabled");
//     }
//     // console.log("tickables", tickables);
//   };
// });

// if ()

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

const ticker: Ticker = new Ticker();
ticker.addTickable(leftVJoyUpdater as Tickable);
ticker.addTickable(rightVJoyUpdater as Tickable);
ticker.addTickable(cameraRig as Tickable);
ticker.addTickable(movementMediator as Tickable);
ticker.addTickable(rotationMediator as Tickable);
ticker.addTickable(mover as Tickable);
ticker.addTickable(dustHandler as Tickable);
ticker.addTickable(powerUpTicker as Tickable);
//add bindings ticker from inputs factory.
ticker.addTickable(inputsFactory.getBindingsTicker() as Tickable);

//GAME PAD LIFE CYCLE MEDIATOR temporarly in line for new joystick inputs.
//let gamePadHandlerLifecycleMediator = new GamePadHandlerLifeCycleMediator(horizontalAxis, verticalAxis, pitchAxis, rollAxis, gamePadHandlerHorizontal, gamePadHandlerVertical, gamePadHandlerPitch, gamePadHandlerRoll, ticker);
//simpley calling it so build errors don't happen.
//gamePadHandlerLifecycleMediator;


let currentTime = Date.now();


function animate() {

  const deltaTime = Date.now() - currentTime;
  currentTime = Date.now();
  const dtMult: number = deltaTime * 0.0025;

  ticker.tick(dtMult);
  renderer.render(scene, camera);

  // feedbackEl!.innerText = `forward: ${desiredForwardAxis.getValue()} smart yaw: ${smartYaw.getCalculatedValue()}yaw axis: ${yawAxis.getValue()} pitch axis: ${pitchAxis.getValue()} forward thrust: ${forwardMediator.getAccelerationValue()}
  // vert thrust: ${verticalMediator.getAccelerationValue()} horiz thrust: ${horizontalMediator.getAccelerationValue()} `;
}

// renderer.setAnimationLoop(animate);
