import { Field, Poseidon } from 'snarkyjs';

/**
 * Generates a random Field number.
 * @returns The generated random number.
 */
export function generateRandomNumber(): Field {
  return Field.random();
}
/**
 * Generates the identity commitment from trapdoor and nullifier.
 * @param nullifier The identity nullifier.
 * @param trapdoor The identity trapdoor.
 * @returns identity commitment
 */
export function generateCommitment(nullifier: Field, trapdoor: Field): Field {
  return Poseidon.hash(nullifier.toFields().concat(trapdoor.toFields()));
}

/**
 * Checks if a string is a JSON.
 * @param jsonString The JSON string.
 * @returns True or false.
 */
export function isJsonArray(jsonString: string) {
  try {
    return Array.isArray(JSON.parse(jsonString));
  } catch (error) {
    return false;
  }
}
