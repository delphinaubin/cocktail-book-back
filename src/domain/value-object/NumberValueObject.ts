export default abstract class NumberValueObject {
  private value: number;
  constructor(value: number) {
    this.value = value;
  }
  public get(): number {
    return this.value;
  }
}
