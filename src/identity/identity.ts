import { Field, Struct } from 'snarkyjs';
import checkParameter from './checkParameter';
import { generateCommitment, generateRandomNumber, isJsonArray } from './util';

export { Identity };

class Identity extends Struct({
  _trapdoor: Field,
  _nullifier: Field,
  _commitment: Field,
}) {
  /**
   * Initializes the class attributes based on the strategy passed as parameter.
   * @param identityOrMessage Additional data needed to create identity for given strategy.
   */
  constructor(identityOrMessage?: string) {
    super({
      _trapdoor: Field(0),
      _nullifier: Field(0),
      _commitment: Field(0),
    });
    if (identityOrMessage === undefined) {
      this._trapdoor = generateRandomNumber();
      this._nullifier = generateRandomNumber();
      this._commitment = generateCommitment(this._nullifier, this._trapdoor);

      return;
    }
    checkParameter(identityOrMessage, 'identityOrMessage', 'string');

    if (!isJsonArray(identityOrMessage)) {
      //const messageHash = hash(identityOrMessage);

      //this.trapdoor = hash(`${messageHash}identity_trapdoor`);
      //this.nullifier = hash(`${messageHash}identity_nullifier`);
      this._commitment = generateCommitment(this._nullifier, this._trapdoor);

      return;
    }

    const [trapdoor, nullifier] = JSON.parse(identityOrMessage);

    this._trapdoor = Field(trapdoor);
    this._nullifier = Field(nullifier);
    this._commitment = generateCommitment(this._nullifier, this._trapdoor);
  }

  /**
   * Returns the identity trapdoor.
   * @returns The identity trapdoor.
   */
  public get trapdoor(): Field {
    return this._trapdoor;
  }

  /**
   * Returns the identity trapdoor.
   * @returns The identity trapdoor.
   */
  public getTrapdoor(): Field {
    return this._trapdoor;
  }

  /**
   * Returns the identity nullifier.
   * @returns The identity nullifier.
   */
  public get nullifier(): Field {
    return this._nullifier;
  }

  /**
   * Returns the identity nullifier.
   * @returns The identity nullifier.
   */
  public getNullifier(): Field {
    return this._nullifier;
  }

  /**
   * Returns the identity commitment.
   * @returns The identity commitment.
   */
  public get commitment(): Field {
    return this._commitment;
  }

  /**
   * Returns the identity commitment.
   * @returns The identity commitment.
   */
  public getCommitment(): Field {
    return this._commitment;
  }

  /**
   * Returns a JSON string with trapdoor and nullifier. It can be used
   * to export the identity and reuse it later.
   * @returns The string representation of the identity.
   */
  public toString(): string {
    return JSON.stringify([
      this._trapdoor.toString(),
      this._nullifier.toString(),
    ]);
  }
}
