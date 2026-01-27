export default function calculateSmartForward(vertical: number, horizontal: number): number {
    return 1 - ((Math.abs(vertical) + Math.abs(horizontal)) * 0.5);
}