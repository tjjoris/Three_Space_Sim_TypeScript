/**
InfoMenuContent.tsx 
@Authro: Luke Johnson
contains the latest info about the game.
displayed in the menu.
 */
import InternalToggleMenuButton from "./InternalToggleMenuButton";
export default function InfoMenuContent () {
	return (
	<div className="scrollable-div menu-content" >
		<h1>
			Three Space Sim (for lack of an actual name)
		</h1>
		<h2>
		    About
		</h2>
		<p>
		    This is a simple space sim that runs in your internet browser. It is currently being casually developed by EtoGreen, aka. Tjjoris.

		</p>
		<h2>
			Controls
		</h2>
		<h3>
			Touch
		</h3>
			<p>
				drag finger on bottom left v-joy to control vertical and horizontal strafe.
			<br/>
				Drag finger on bottom right v-joy to control pitch and roll.
			</p>
		<h3>
				Joystick
		</h3>
		<p>
			plug in your gamepad or joystick and activate it by pressing a button or moving an axis.
			<br/>
			Go into the keybinds menu, and bind the axes to control pitch, roll, vertical, and horizontal.
			<br/>
			    Multiple joysicks are supported.
		</p>
		<h3>
		    If your on mouse and keyboard....
		</h3>
		    <p>
			The controls are not currently designed to support mouse and keyboard, any other developer would have implemented that first, but I personally despise playing space sims or flight sims with mouse and keyboard.
		    </p>
		<h3>
		    Storage
		</h3>
		<p>
		    Keybinds and settings are stored in cookies, so next time you open the space sim in the same browser on the same device, it will remember them. At least until you clear your cookies.
		</p>
		<h3>
		    Rotation
		</h3>
		<p>
		    You can only rotate in pitch and roll to give this more of a cinematic aircraft like feel.  
		</p>
		<h3>
		   Translational Acceleration
		</h3>
		<p>
		    You can control your vertical and horizontal strafe for more of a 6 degrees of freedom space sim feel. 

		</p>
		<h3>
			Forward acceleration
		</h3>
			<p>
				Forward acceleration is automatic, but vertical or horizontal acceleration subtracts from forward acceleration.
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
			Planned upcoming features
		</h2>
		<ul>
			<li>
			    touch v-joy improvements.
			</li>
			<li>
			    Ring chase mode.
			</li>
		    <li>
			basic multiplayer (player hosting).
		    </li>
			<li>
			    close range charge attacks.
			</li>
			<li>
			    Plenty more ideas but will need to build these first and see how it feels.
			</li>
		</ul>
		<InternalToggleMenuButton/>
	</div>
)}
