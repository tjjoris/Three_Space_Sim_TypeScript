type Listener = () => void;

/**
 * this class tracks if the vjoy has been used, it is called by vjoy input 
 * when a vjoy has been used. it then notifys the vJoyUsedOverlay.tsx through
 * vjoyUsed store.
 */
export default class VJoyUsedTracker {
    private static instance: VJoyUsedTracker | null = null;
    private isVJoyAlreadyUsed: boolean = false;
    private listeners: Listener[] = []; //listeners subscribed to.


    public static getVJoyUsedTracker(): VJoyUsedTracker {
        if (this.instance === null) {
            this.instance = new VJoyUsedTracker();
            return this.instance;
        }
        else return this.instance;
    }

    public setVJoyToUsed() {
        this.isVJoyAlreadyUsed = true;
        this.notify();
    }
    public getIsVJoyAlreadyUsed(): boolean {
        return this.isVJoyAlreadyUsed;
    }


    /**
     * subscribe to listener for useLandscapeStore
     * @param listener 
     */
    public subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        }
    }


    /**
     * notify all listeners
     */
    private notify() {
        console.log("in listener");
        this.listeners.forEach((listener) => listener());
    }
}