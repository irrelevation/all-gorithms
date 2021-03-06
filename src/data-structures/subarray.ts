export class Subarray<T> {
  array: T[];
  #from: number;
  #to: number;

  constructor(
    arrayOrSubarray: T[] | Subarray<T>,
    from = 0,
    to = arrayOrSubarray.length
  ) {
    // switch the bounds if they were entered in the wrong order
    if (to < from) [from, to] = [to, from];

    if (from < 0)
      throw new Error(
        `Lower bound out of range: expected int between 0 and ${arrayOrSubarray.length} but got ${from}`
      );
    if (to > arrayOrSubarray.length)
      throw new Error(
        `Upper bound out of range: expected int between 0 and ${arrayOrSubarray.length} but got ${to}`
      );

    if (arrayOrSubarray instanceof Subarray) {
      this.array = arrayOrSubarray.array;
      this.#from = arrayOrSubarray.#from + from;
      this.#to = arrayOrSubarray.#from + to;
    } else if (Array.isArray(arrayOrSubarray)) {
      this.array = arrayOrSubarray;
      this.#from = from;
      this.#to = to;
    } else {
      // exhaustiveness check
      ((value: never) => {
        throw new Error(`Can't create a Subarray from ${value}`);
      })(arrayOrSubarray);
    }
  }

  *[Symbol.iterator]() {
    for (let index = this.#from; index < this.#to; index++) {
      yield this.array[index];
    }
  }

  toString() {
    return JSON.stringify(this.array.slice(this.#from, this.#to));
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
    return this.array[index + this.#from];
  }

  set(index: number, value: T) {
    if (!this.#isInRange(index))
      throw new Error(
        `Index out of range: expected int between 0 and ${this.length} but got ${index}`
      );
    this.array[index + this.#from] = value;
  }

  swap(i: number, j: number) {
    if (!this.#isInRange(i)) throw new Error("First Index out of range");
    if (!this.#isInRange(j)) throw new Error("Second Index out of range");
    const temp = this.get(i);
    this.set(i, this.get(j));
    this.set(j, temp);
  }

  asArray() {
    return this.array.slice(this.#from, this.#to);
  }
}
