import checkCookie from "../../cookies/checkCookie";
/**
InfoMenuContent.tsx 
@Authro: Luke Johnson
contains the latest info about the game.
displayed in the menu.
 */
export default function InfoMenuContent () {
	return (
	<div className="scrollable-div menu-content" >
		<h1>
			Three Space Sim (for lack of an actual name)
		</h1>
		<h2>
			Controls
		</h2>
		<h3>
			Touch
		</h3>
			<p>
				drag finger on bottom left v-joy to control vertical and horizontal strafe.
			</p>
			<br/>
				Drag finger on bottom right v-joy to control pitch and roll.
		<h3>
				Joystick
		</h3>
		<p>
			plug in your gamepad or joystick and activate it by pressing a button on it.
			<br/>
			Go into the keybinds menu, and bind the axes to control pitch, roll, vertical, and horizontal.
		</p>
		<h3>
			Forward acceleration
		</h3>
			<p>
				Forward is the remaing acceleration after your vertical and horizontal inputs.
			</p>
		<h3>
			Yaw
		</h3>
			<p>
				Yaw is automatic, it's a result of your roll, and other inputs.
			</p>
		<h2>
			Gameplay
		</h2>
			<p>
				The current gameplay is to fly through the rings.
					<br/>
			</p>
		<h2>
			Future implementations
		</h2>
		<ul>
			<li>
				Multiple Joystick Support.
			</li>
			<li>
				Configureable Keybinds.
			</li>
			<li>
				Projectiles
			</li>
			<li>
				New Game Modes.
			</li>
		</ul>
		<button onClick = {() => {checkCookie()}}> Check Cookie </button>
	</div>
)}
