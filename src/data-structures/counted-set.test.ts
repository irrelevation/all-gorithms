import { CountedSet } from "./counted-set";

// count

// clear

let countedSet: CountedSet<unknown>;
beforeEach(() => {
  countedSet = new CountedSet();
});

describe("The constructor", () => {
  test("should return an empty counted set given no parameters", () => {
    expect(countedSet.size).toBe(0);
  });
  test("should populate the counted set given an iterable", () => {
    let countedSetFromArray = new CountedSet(["A", "A", "B", "B", "A"]);
    expect(countedSetFromArray.getCount("A")).toBe(3);
    expect(countedSetFromArray.getCount("B")).toBe(2);
  });
});

describe("The has(value) method", () => {
  test("should check if the value exists in the counted set", () => {
    expect(countedSet.has("A")).toBe(false);
    countedSet.add("A");
    expect(countedSet.has("A")).toBe(true);
  });
  test("should return false if the last instance of a value has been deleted", () => {
    countedSet.add("A");
    countedSet.decrement("A");
    expect(countedSet.has("A")).toBe(false);
  });
});

describe("The get(value) method", () => {
  test("should return the number of times a value has been added to the set", () => {
    expect(countedSet.getCount("A")).toBe(0);
    countedSet.add("A");
    expect(countedSet.getCount("A")).toBe(1);
    countedSet.add("A");
    expect(countedSet.getCount("A")).toBe(2);
  });
});

describe("The setCount(value, count) method", () => {
  test("should set the count for the specified value", () => {
    countedSet.setCount("A", 15);
    expect(countedSet.getCount("A")).toBe(15);
    countedSet.setCount("A", -2);
    expect(countedSet.getCount("A")).toBe(-2);
  });
});

describe("The decrement(value) method", () => {
  test("should decrease the count of a value by 1", () => {
    countedSet.add("A");
    countedSet.add("A");
    expect(countedSet.getCount("A")).toBe(2);
    countedSet.decrement("A");
    expect(countedSet.getCount("A")).toBe(1);
    countedSet.decrement("A");
    expect(countedSet.getCount("A")).toBe(0);
  });

  test("should do nothing if the value is not in the set or it's count is 0", () => {
    countedSet.decrement("A");
    expect(countedSet.getCount("A")).toBe(0);
    countedSet.add("B");
    countedSet.decrement("B");
    countedSet.decrement("B");
    expect(countedSet.getCount("B")).toBe(0);
  });
});

describe("The size property", () => {
  test("should return the number of elements in the set (ignoring the counts)", () => {
    expect(new CountedSet([1, 2, 3, 3, 2, 2, 1]).size).toBe(3);
  });

  test("should be 0 when the set is empty", () => {
    expect(countedSet.size).toBe(0);
    countedSet.add("A");
    countedSet.decrement("A");
    expect(countedSet.size).toBe(0);
  });

  test("should increase by 1 if the value we add is not in the set", () => {
    countedSet.add("A");
    expect(countedSet.size).toBe(1);
    countedSet.add("B");
    expect(countedSet.size).toBe(2);
  });

  test("should not increase if we add a value that is allready in the set", () => {
    countedSet.add("A");
    expect(countedSet.size).toBe(1);
    countedSet.add("A");
    expect(countedSet.size).toBe(1);
  });

  test("should not decrease if we delete a value that is not in the set", () => {
    countedSet.decrement("A");
    expect(countedSet.size).toBe(0);
  });
});

describe("The entries method", () => {
  test("returns an iterator object that contains [value, count] pairs for each value in the counted set", () => {
    expect([...countedSet.entries()]).toStrictEqual([]);

    // TODO This test relies on the order of the iterator implementation of JavaScripts native Map.entries();
    // Find a test that is less brittle.
    expect([
      ...new CountedSet(["A", "A", "A", "B", "C"]).entries(),
    ]).toStrictEqual([
      ["A", 3],
      ["B", 1],
      ["C", 1],
    ]);
  });
});

test("should be iterable", () => {
  for (const element of countedSet) {
  }
});

describe("The keys() method", () => {
  test("should return an iterator containing all values in the counted set", () => {
    expect([...countedSet.keys()]).toStrictEqual([]);
    expect([...new CountedSet(["A", "A", "A", "B", "C"]).keys()]).toStrictEqual(
      ["A", "B", "C"]
    );
  });
});

describe("The values() method", () => {
  test("should return an iterator containing all counts in the counted set", () => {
    expect([...countedSet.values()]).toStrictEqual([]);
    expect([
      ...new CountedSet(["A", "A", "A", "B", "C"]).values(),
    ]).toStrictEqual([3, 1, 1]);
  });
});

describe("The clear() method", () => {
  test("should remove all elements from the counted set", () => {
    let clearedSet = new CountedSet([1, 2, 3]);
    clearedSet.clear();
    expect(clearedSet).toStrictEqual(countedSet);
  });
});

describe("The count property", () => {
  test("should return the sum of the counts of all elements in the set", () => {
    expect(new CountedSet([0, 1, 1, 2, 3, 4, 1]).count).toBe(7);
  });
  test("should return 0 if the set is empty", () => {
    expect(countedSet.count).toBe(0);
  });
});
