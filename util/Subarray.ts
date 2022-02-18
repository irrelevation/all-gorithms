export class Subarray<T> {
  #array: T[];
  #from: number;
  #to: number;

  constructor(array: T[] | Subarray<T>, from = 0, to = array.length) {
    // switch the bounds if they were entered in the wrong order
    if (to < from) [from, to] = [to, from];

    if (from < 0)
      throw new Error(
        `Lower bound out of range: expected int between 0 and ${array.length} but got ${from}`
      );
    if (to > array.length)
      throw new Error(
        `Upper bound out of range: expected int between 0 and ${array.length} but got ${to}`
      );

    if (array instanceof Subarray) {
      this.#array = array.#array;
      this.#from = array.#from + from;
      this.#to = array.#from + to;
    } else {
      this.#array = array;
      this.#from = from;
      this.#to = to;
    }
  }

  *[Symbol.iterator]() {
    for (let index = this.#from; index < this.#to; index++) {
      yield this.#array[index];
    }
  }

  #isInRange(index: number) {
    return index >= 0 && index <= this.length;
  }

  get length() {
    return this.#to - this.#from;
  }

  get(index: number) {
    if (!this.#isInRange(index))
      throw new Error(
        `Index out of range: expected int between 0 and ${this.length} but got ${index}`
      );
    return this.#array[index + this.#from];
  }

  set(index: number, value: T) {
    if (!this.#isInRange(index))
      throw new Error(
        `Index out of range: expected int between 0 and ${this.length} but got ${index}`
      );
    this.#array[index + this.#from] = value;
  }

  swap(i: number, j: number) {
    if (!this.#isInRange(i)) throw new Error("First Index out of range");
    if (!this.#isInRange(j)) throw new Error("Second Index out of range");
    const temp = this.get(i);
    this.set(i, this.get(j));
    this.set(j, temp);
  }
}
