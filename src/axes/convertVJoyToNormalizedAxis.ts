import clamp from "../helpers/clamp";

export default function ConvertVJoyToNormalizedAxis(origionalPos: number, currentPos: number, maxDeflection: number) {
    return clamp(((currentPos - origionalPos) / maxDeflection), -1, 1);
}