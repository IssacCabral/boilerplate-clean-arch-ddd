export class AbstractValueObject<T> {
  protected constructor(protected readonly value: T) {}

  public getValue(): T {
    return this.value;
  }

  public equals(other: AbstractValueObject<T>): boolean {
    return this.value === other.value;
  }
}
