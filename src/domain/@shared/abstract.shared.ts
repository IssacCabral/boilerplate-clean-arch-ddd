// Props is encapsulated, cannot be changed directly
// Whenever you need to change something, create a method in the entity
// Ex: user.updateEmail(newEmail: string): void { this.props.email = newEmail }

import { Timestamps } from "./timestamps.shared";

export abstract class AbstractEntity<T extends Timestamps> {
  protected constructor(protected readonly props: T) {}

  /**
   * Returns all raw data of the entity (including sensitive fields).
   */
  public export(): T {
    return { ...this.props };
  }

  protected touch(): void {
    this.props.updatedAt = new Date();
  }
}
