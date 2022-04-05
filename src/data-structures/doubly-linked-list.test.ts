import DoublyLinkedList from "./doubly-linked-list";

let linkedList: DoublyLinkedList<unknown>;
beforeEach(() => (linkedList = new DoublyLinkedList()));

describe("The constructor", () => {
  test("should create an empty list given no parameters", () => {
    expect(new DoublyLinkedList().length).toBe(0);
  });
  test("should create a populated list given an iterable", () => {
    let populatedList = new DoublyLinkedList(["a", "b", "c"]);
    linkedList.addAtIndex(0, "a");
    linkedList.addAtIndex(1, "b");
    linkedList.addAtIndex(2, "c");
    expect(populatedList).toEqual(linkedList);
  });
});

describe("get(index)", () => {
  test("should return -1 if the index is invalid", () => {
    linkedList.addAtTail(1);
    expect(linkedList.get(10)).toBe(-1);
    expect(linkedList.get(-2)).toBe(-1);
  });

  test("can get the last value of a one node list", () => {
    linkedList.addAtTail(7);
    expect(linkedList.get(0)).toBe(7);
  });

  test("can get the last value of a two node list", () => {
    linkedList.addAtTail(7);
    linkedList.addAtTail(2);
    expect(linkedList.get(1)).toBe(2);
  });

  test("can get the first value of a two node list", () => {
    linkedList.addAtTail(7);
    linkedList.addAtTail(2);
    expect(linkedList.get(0)).toBe(7);
  });
  test("can get the ith value counting from the end of the list by passing a negative number", () => {
    linkedList.addAtHead("b");
    linkedList.addAtHead("a");
    linkedList.addAtTail("c");

    expect(linkedList.get(-1)).toBe("c");
    expect(linkedList.get(-2)).toBe("b");
    expect(linkedList.get(-3)).toBe("a");
  });
});

describe("addAtHead(value)", () => {
  test("can add a value to the head of an empty list", () => {
    linkedList.addAtHead(7);
    expect(linkedList.get(0)).toBe(7);
  });

  test("can add a value to the head of a one node list list", () => {
    linkedList.addAtHead(7);
    linkedList.addAtHead(3);

    expect(linkedList.get(0)).toBe(3);
    expect(linkedList.get(1)).toBe(7);
  });
});

describe("addAtIndex(index, value)", () => {
  test("can add a value to an empty list", () => {
    linkedList.addAtIndex(0, 7);
    expect(linkedList.get(0)).toBe(7);
  });
  test("can add a value to the start of a list", () => {
    linkedList.addAtIndex(0, "b");
    linkedList.addAtIndex(0, "a");
    expect(linkedList.get(0)).toBe("a");
  });
  test("can add a value to the end of a list", () => {
    linkedList.addAtIndex(0, "a");
    linkedList.addAtIndex(1, "b");
    expect(linkedList.get(1)).toBe("b");
  });
  test("can add a value in the middle of a list", () => {
    linkedList.addAtIndex(0, "a");
    linkedList.addAtIndex(1, "c");
    linkedList.addAtIndex(1, "b");
    expect(linkedList.get(1)).toBe("b");
  });
  test("should ignore value if index is invalid", () => {
    let emptyList = new DoublyLinkedList();
    linkedList.addAtIndex(10, "a");
    expect(linkedList).toEqual(emptyList);
  });
});

describe("deleteAtIndex(index)", () => {
  test("should delete the only node of a single node list", () => {
    let emptyList = new DoublyLinkedList();
    linkedList.addAtHead(1);
    linkedList.deleteAtIndex(0);
    expect(linkedList).toEqual(emptyList);
  });
  test("should delete the first node of a list", () => {
    let linkedList = new DoublyLinkedList(["a", "b"]);
    linkedList.deleteAtIndex(0);
    let expectedList = new DoublyLinkedList(["b"]);
    expect(linkedList).toEqual(expectedList);
  });
  test("should delete the last node of a list", () => {
    let linkedList = new DoublyLinkedList(["a", "b"]);
    linkedList.deleteAtIndex(1);
    let expectedList = new DoublyLinkedList(["a"]);
    expect(linkedList).toEqual(expectedList);
  });
  test("should delete a middle node of a list", () => {
    let linkedList = new DoublyLinkedList(["a", "b", "c"]);
    linkedList.deleteAtIndex(1);
    let expectedList = new DoublyLinkedList(["a", "c"]);
    expect(linkedList).toEqual(expectedList);
  });
  test("should do nothing if index is invalid", () => {
    let expectedList = new DoublyLinkedList(["a"]);
    linkedList.addAtHead("a");
    linkedList.deleteAtIndex(3);
    expect(linkedList).toEqual(expectedList);
  });
});
