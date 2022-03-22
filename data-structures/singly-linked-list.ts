interface SinglyLinkedListNode<T> {
  value: T;
  next: SinglyLinkedListNode<T> | null;
}

// MyLinkedList() Initializes the MyLinkedList object.
// int get(int index) Get the value of the indexth node in the linked list. If the index is invalid, return -1.
// void addAtHead(int val) Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
// void addAtTail(int val) Append a node of value val as the last element of the linked list.
// void addAtIndex(int index, int val) Add a node of value val before the indexth node in the linked list. If index equals the length of the linked list, the node will be appended to the end of the linked list. If index is greater than the length, the node will not be inserted.
// void deleteAtIndex(int index) Delete the indexth node in the linked list, if the index is valid.

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

// prettier-ignore
const commands = ["addAtHead","addAtTail","addAtTail","get","get","addAtTail","addAtIndex","addAtHead","addAtHead","addAtTail","addAtTail","addAtTail","addAtTail","get","addAtHead","addAtHead","addAtIndex","addAtIndex","addAtHead","addAtTail","deleteAtIndex","addAtHead","addAtHead","addAtIndex","addAtTail","get","addAtIndex","addAtTail","addAtHead","addAtHead","addAtIndex","addAtTail","addAtHead","addAtHead","get","deleteAtIndex","addAtTail","addAtTail","addAtHead","addAtTail","get","deleteAtIndex","addAtTail","addAtHead","addAtTail","deleteAtIndex","addAtTail","deleteAtIndex","addAtIndex","deleteAtIndex","addAtTail","addAtHead","addAtIndex","addAtHead","addAtHead","get","addAtHead","get","addAtHead","deleteAtIndex","get","addAtHead","addAtTail","get","addAtHead","get","addAtTail","get","addAtTail","addAtHead","addAtIndex","addAtIndex","addAtHead","addAtHead","deleteAtIndex","get","addAtHead","addAtIndex","addAtTail","get","addAtIndex","get","addAtIndex","get","addAtIndex","addAtIndex","addAtHead","addAtHead","addAtTail","addAtIndex","get","addAtHead","addAtTail","addAtTail","addAtHead","get","addAtTail","addAtHead","addAtTail","get","addAtIndex"]
// prettier-ignore
const inputs = [[84], [2], [39], [3], [1], [42], [1, 80], [14], [1], [53], [98], [19], [12], [2], [16], [33], [4, 17], [6, 8], [37], [43], [11], [80], [31], [13, 23], [17], [4], [10, 0], [21], [73], [22], [24, 37], [14], [97], [8], [6], [17], [50], [28], [76], [79], [18], [30], [5], [9], [83], [3], [40], [26], [20, 90], [30], [40], [56], [15, 23], [51], [21], [26], [83], [30], [12], [8], [4], [20], [45], [10], [56], [18], [33], [2], [70], [57], [31, 24], [16, 92], [40], [23], [26], [1], [92], [3, 78], [42], [18], [39, 9], [13], [33, 17], [51], [18, 95], [18, 33], [80], [21], [7], [17, 46], [33], [60], [26], [4], [9], [45], [38], [95], [78], [54], [42, 86]]

let myList = new SinglyLinkedList<number>();
// console.log(`[${[1, 2]}]`);
for (let index = 0; index < commands.length; index++) {
  const command = commands[index];
  const input = inputs[index];
  eval(`myList.${command}(...[${String(input)}])`);
}
