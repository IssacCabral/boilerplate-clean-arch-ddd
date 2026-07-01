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

  /**
   * Returns a "safe" version of the entity, removing sensitive fields.
   * Each subclass must override `getSensitiveFields()` if it wants to use this.
   */
  public exportSafe(): Partial<T> {
    const sensitiveFields = this.getSensitiveFields();
    const clone = { ...this.props };

    for (const field of sensitiveFields) {
      delete clone[field];
    }

    return clone as Partial<T>;
  }

  /**
   * Must be overridden by entities that have sensitive data.
   * Ex: return ['password', 'twoFactorSecret']
   */
  protected getSensitiveFields(): Array<keyof T> {
    return [];
  }

  protected touch(): void {
    this.props.updatedAt = new Date();
  }
}
