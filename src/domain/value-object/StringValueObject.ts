export default abstract class StringValueObject {

  private value: string;
  constructor(value: string) {
    this.value = value;
  }

  public get(): string {
    return this.value;
  }
}
