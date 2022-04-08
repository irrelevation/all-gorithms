export class CountedSet<T> {
  map: Map<T, number>;

  constructor(iterable?: Iterable<T>) {
    this.map = new Map<T, number>();
    if (iterable) {
      for (const value of iterable) {
        this.add(value);
      }
    }
  }

  add(value: T): void {
    this.setCount(value, this.getCount(value) + 1);
  }
  has(value: T): boolean {
    return this.getCount(value) > 0;
  }
  getCount(value: T): number {
    return this.map.get(value) ?? 0;
  }
  setCount(value: T, count: number): void {
    this.map.set(value, count);
  }
  decrement(value: T) {
    if (!this.has(value)) return;
    let newCount = this.getCount(value) - 1;
    if (newCount === 0) {
      this.map.delete(value);
    } else {
      this.setCount(value, Math.max(0, this.getCount(value) - 1));
    }
  }
  entries(): IterableIterator<[T, number]> {
    return this.map.entries();
  }
  keys(): IterableIterator<T> {
    return this.map.keys();
  }
  values(): IterableIterator<number> {
    return this.map.values();
  }
  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }
  get count(): number {
    return [...this.values()].reduce((sum, count) => sum + count, 0);
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}
