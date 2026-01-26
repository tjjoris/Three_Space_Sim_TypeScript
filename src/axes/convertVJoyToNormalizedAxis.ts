export default function ConvertVJoyToNormalizedAxis(origionalPos: number, currentPos: number, maxDeflection: number) {
    return (currentPos - origionalPos) / maxDeflection;
}