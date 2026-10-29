import { INPUT_CONSTS } from  "../consts/inputConsts";
/*
 *inputType.ts
 @Author: Luke Johnson
 this is a type for the inputs for bindings, so we know if a binidng is set to a joy axis, joy button, touch, keyboard button, or mouse.
 */

export type InputType = typeof INPUT_CONSTS[keyof typeof INPUT_CONSTS];
// "joyAxis" | "touch"
