import Node from "./node";

test("new Node(7) should return a Node with the value of 7", () => {
  expect(new Node(7).value).toBe(7);
});
test("new Node('asdf') should return a Node with the value of 'asdf'", () => {
  expect(new Node("asdf").value).toBe("asdf");
});
test("should hold a reference to the provided neighbours", () => {
  let neighbours = [new Node("n1"), new Node("n2"), new Node("n3")];
  let nodeWithNeighbours = new Node("i got neighbours =D", neighbours);
  expect(nodeWithNeighbours.neighbours).toBe(neighbours);
});
test("should have no neighbours if neighbours are not provided", () => {
  expect(new Node("lonely").neighbours.length).toBe(0);
});
test("should have a value of null if no value is provided", () => {
  expect(new Node().value).toBe(null);
});
