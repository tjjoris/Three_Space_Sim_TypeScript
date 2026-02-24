export default interface Tickable {
    tick(deltaTime: number): void;
}