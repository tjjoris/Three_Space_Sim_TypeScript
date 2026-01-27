export default function calculateSmartForward(vertical: number, horizontal: number): number {
    return 1 - ((vertical + horizontal) * 0.5);
}