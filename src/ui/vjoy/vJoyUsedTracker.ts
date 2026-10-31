/**
 * this class tracks if the vjoy has been used, it is called by vjoy input 
 * when a vjoy has been used. it then sets the vJoyUsed on gameState which notifies UseGameStateStore so react get's updated. */
import GameState from "../../ui/menu/gameState";

export default class VJoyUsedTracker {
    private isVJoyAlreadyUsed: boolean = false;
    private gameState: GameState;

    public constructor (gameState: GameState) {
	    this.gameState = gameState;
    }

    public setVJoyToUsed() {
	    //end function if already true.
	    if (this.isVJoyAlreadyUsed == true) {
		    return; 
	    }
        this.isVJoyAlreadyUsed = true;
	this.gameState.setStateVJoyUsed(this.isVJoyAlreadyUsed);
    }
    public getIsVJoyAlreadyUsed(): boolean {
        return this.isVJoyAlreadyUsed;
    }
}
