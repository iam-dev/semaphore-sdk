import { Field, MerkleWitness, Struct } from 'snarkyjs';

export { Group };

export class MyMerkleWitness extends MerkleWitness(8) {}
let w = {
  isLeft: false,
  sibling: Field(0),
};
let dummyWitness = Array.from(Array(MyMerkleWitness.height - 1).keys()).map(
  () => w
);

class Group extends Struct({
  _id: Field,
  _witness: MyMerkleWitness,
}) {
  constructor(id: Field) {
    super({ _id: Field(0), _witness: new MyMerkleWitness(dummyWitness) });
    this._id = id;
    this._witness = new MyMerkleWitness(dummyWitness);
  }

  public get id(): Field {
    return this._id;
  }
}
