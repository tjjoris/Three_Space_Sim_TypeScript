/*
 *inputDiffsCompareForAllJoys.ts
 @Author: Luke Johnson
 This class is used to read inputs for binding the inputs in the React menu.
 It stores InputDiffsCompareForJoy which exists for each connected joy.
 This class has it's update loop activated by a static function called by React.
Also it's update loop is disabled in a similar way.
when the update loop gets a valid diff, it checks if it is different from the previous stored diff, and if it is not, it stores it, and that state sends a signal to UseSyncExternalStore in React which updates the Menu showing the set binding.

 */
export default class InputDiffsCompareForAllJoys {
		
}
