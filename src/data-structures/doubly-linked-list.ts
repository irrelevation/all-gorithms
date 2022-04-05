class DoublyLinkedListNode<T> {
  prev: DoublyLinkedListNode<T> | null;
  next: DoublyLinkedListNode<T> | null;
  val: T;
  constructor(val: T) {
    this.prev = null;
    this.next = null;
    this.val = val;
  }
}

export default class DoublyLinkedList<T> {
  length: number;
  head: DoublyLinkedListNode<T> | null;
  tail: DoublyLinkedListNode<T> | null;

  constructor(iterable?: Iterable<T>) {
    this.length = 0;
    this.head = null;
    this.tail = null;

    if (iterable) {
      for (let element of iterable) {
        this.addAtTail(element);
      }
    }
  }

  addAtTail(val: T) {
    let node = new DoublyLinkedListNode(val);
    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }
    node.prev = this.tail;
    this.tail = node;
    this.length++;
  }

  addAtHead(val: T) {
    if (!this.head) {
      this.addAtTail(val);
    } else {
      let node = new DoublyLinkedListNode(val);
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      this.length++;
    }
  }

  addAtIndex(index: number, val: T) {
    if (index === 0) return this.addAtHead(val);
    if (index === this.length) return this.addAtTail(val);
    if (!this.isValidIndex(index)) return;
    let next = this.getNode(index);
    let prev = next.prev as DoublyLinkedListNode<T>;
    let node = new DoublyLinkedListNode(val);
    node.prev = prev;
    node.next = next;
    prev.next = node;
    next.prev = node;
    this.length++;
  }

  get(index: number) {
    if (!this.isValidIndex(index)) return -1;
    return this.getNode(index).val;
  }

  deleteAtIndex(index: number): void {
    if (!this.isValidIndex(index)) return;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return;
    }
    let node = this.getNode(index);
    if (node === this.head) {
      this.head = this.head.next;
      this.head!.prev = null;
    } else if (node === this.tail) {
      this.tail = this.tail.prev;
      this.tail!.next = null;
    } else {
      node.prev!.next = node.next;
      node.next!.prev = node.prev;
    }

    this.length--;
  }

  *[Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node.val;
      node = node.next;
    }
  }

  private isValidIndex(index: number) {
    return index < this.length && index * -1 <= this.length;
  }

  private getNode(index: number): DoublyLinkedListNode<T> {
    let node;
    if (index < 0) {
      node = this.tail as DoublyLinkedListNode<T>;
      for (let i = -1; i > index; i--) {
        node = node?.prev;
      }
    } else {
      node = this?.head;
      for (let i = 0; i < index; i++) {
        node = node?.next;
      }
    }
    return node as DoublyLinkedListNode<T>;
  }
}
