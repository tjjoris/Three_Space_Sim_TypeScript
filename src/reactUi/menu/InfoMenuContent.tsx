/**
InfoMenuContent.tsx 
@Authro: Luke Johnson
contains the latest info about the game.
displayed in the menu.
 */
export default function InfoMenuContent () {
	return (
	<div className="scrollable-div" >
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
			Gamepad
		</h3>
		<p>
			plug in your gamepad and activate it by pressing a button on it.
			<br/>
			By default, bottom left stick controls vertical and horizontal strafe, and bottom right stick controls pitch and roll.
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
	</div>
)}
