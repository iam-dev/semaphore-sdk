// import { Field } from 'snarkyjs';
import { isReady } from 'snarkyjs';
import { Identity } from './identity.js';

await isReady;

describe('Identity', () => {
  describe('# Identity', () => {
    it('Should not create a identity if the parameter is not valid', () => {
      const fun1 = () => new Identity(13 as any);
      const fun2 = () => new Identity(true as any);
      const fun3 = () => new Identity((() => true) as any);

      expect(fun1).toThrow("Parameter 'identityOrMessage' is not a string");
      expect(fun2).toThrow("Parameter 'identityOrMessage' is not a string");
      expect(fun3).toThrow("Parameter 'identityOrMessage' is not a string");
    });

    it('Should create random identities', () => {
      const identity1 = new Identity();
      const identity2 = new Identity();

      expect(identity1.trapdoor).not.toBe(identity2.getTrapdoor());
      expect(identity1.nullifier).not.toBe(identity2.getNullifier());
      expect(identity1.commitment).not.toBe(identity2.getCommitment());
    });
  });
});
