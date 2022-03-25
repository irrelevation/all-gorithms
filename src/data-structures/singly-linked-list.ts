interface SinglyLinkedListNode<T> {
  value: T;
  next: SinglyLinkedListNode<T> | null;
}

export class SinglyLinkedList<T> {
  #head: SinglyLinkedListNode<T> | null = null;
  #tail: SinglyLinkedListNode<T> | null = null;
  length: number = 0;

  constructor(initialValues: Iterable<T> = []) {
    for (let value of initialValues) {
      this.append(value);
    }
  }

  #isOutOfRange(index: number): boolean {
    return index < 0 || index >= this.length;
  }

  #getNodeAt(index: number): SinglyLinkedListNode<T> | undefined {
    if (index < 0) index = this.length + index;
    if (index < 0 || index >= this.length) return undefined;

    let node: SinglyLinkedListNode<T> = this.#head as SinglyLinkedListNode<T>;
    for (let i = 0; i < index; i++) {
      node = node?.next as SinglyLinkedListNode<T>;
    }

    return node;
  }

  *[Symbol.iterator]() {
    let node = this.#head;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }

  toArray() {
    return [...this];
  }

  get(index: number): T | undefined {
    return this.#getNodeAt(index)?.value;
  }

  set(index: number, value: T): void {
    const node = this.#getNodeAt(index);
    if (node) node.value = value;
  }

  prepend(value: T): void {
    const node = {
      next: this.#head,
      value,
    };

    this.#tail ??= node;
    this.#head = node;
    this.length++;
  }

  addAtHead(value: T): void {
    this.prepend(value);
  }

  deleteAtHead(): void {
    if (!this.#head?.next) {
      this.empty();
      return;
    }

    this.#head = this.#head.next;
    this.length--;
  }

  append(value: T): void {
    const node = {
      next: null,
      value,
    };

    if (this.#tail) {
      this.#tail.next = node;
    } else {
      this.#head = node;
    }
    this.#tail = node;
    this.length++;
  }

  addAtTail(value: T): void {
    this.append(value);
  }

  getAtTail(): T | undefined {
    return this.#tail?.value;
  }

  deleteAtTail(): void {
    if (this.length <= 1) {
      this.empty();
      return;
    }

    const penultimateNode = this.#getNodeAt(this.length - 2);
    if (penultimateNode) {
      this.#tail = penultimateNode;
      penultimateNode.next = null;
      this.length--;
    }
  }

  pop(): T | undefined {
    const result = this.#tail?.value;
    this.deleteAtTail();
    return result;
  }

  addAtIndex(index: number, value: T): void {
    if (index < 0) index = this.length + index;
    if (index < 0 || index > this.length) throw new Error("Index out of range");

    if (index === 0) {
      this.prepend(value);
    } else if (index === this.length) {
      this.append(value);
    } else {
      const predecessor = this.#getNodeAt(index - 1) as SinglyLinkedListNode<T>;
      const successor = predecessor?.next;
      const node = {
        next: successor,
        value,
      };
      predecessor.next = node;
      this.length++;
    }
  }

  deleteAtIndex(index: number): void {
    if (index < 0) index = this.length + index;
    if (this.#isOutOfRange(index)) return;

    if (index === 0) {
      this.deleteAtHead();
    } else if (index === this.length - 1) {
      this.deleteAtTail();
    } else {
      const predecessor = this.#getNodeAt(index - 1) as SinglyLinkedListNode<T>;
      const successor = predecessor.next!.next;
      predecessor.next = successor;
      this.length--;
    }
  }

  empty(): void {
    this.#tail = null;
    this.#head = null;
    this.length = 0;
  }
}
