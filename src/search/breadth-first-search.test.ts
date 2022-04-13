// distance(from: Node, to: Node): number

import { BFS } from "./breadth-first-search";
import Node from "../data-structures/node";
import { Node as TNode } from "../types";

// describe("The distance(from: Node, to: Node) function", () => {
//     test("should return 0 if the nodes are identical", () => {
//         expect
//     })
// });

describe("The find(start, testFn) method", () => {
  test("should return the start node if it satisfies the test function", () => {
    const startNode = new Node();
    const isStartNode = (node: TNode<unknown>) => node === startNode;
    expect(BFS.find(startNode, isStartNode)).toBe(startNode);
  });
  test("should return null if the start node doesnt have neighbours and doesn't satisfies the test function", () => {
    const startNode = new Node();
    const isFalse = (node: TNode<unknown>) => false;
    expect(BFS.find(startNode, isFalse)).toBe(null);
  });
  test("should return the target node, if the start node doesnt have satisfies the test function, but the target does and is one of the neighbours", () => {
    const targetNode = new Node("target");
    const startNode = new Node("start", [targetNode]);
    const isTarget = (node: TNode<unknown>) => node.value === "target";
    expect(BFS.find(startNode, isTarget)).toBe(targetNode);
  });
  test("should return the target node if it is a neighbours neighbour and satisfies the test function", () => {
    const targetNode = new Node("target");
    const neighbour = new Node("neighbour", [targetNode]);
    const startNode = new Node("start", [neighbour]);
    const isTarget = (node: TNode<unknown>) => node.value === "target";
    expect(BFS.find(startNode, isTarget)).toBe(targetNode);
  });
  test("should return null if the graph has a cycle and there is no node that satisfies the condition", () => {
    const start = new Node("start");
    const B = new Node("B", [start]);
    start.neighbours = [B];
    const isFalse = (node: TNode<unknown>) => false;
    expect(BFS.find(start, isFalse)).toBe(null);
  });
});
