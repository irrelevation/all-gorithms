// distance(from: Node, to: Node): number

import { BFS } from "./breadth-first-search";
import Node from "../data-structures/node";
import { Node as TNode } from "../types";

const isStart = (node: TNode<unknown>) => node.value === "start";
const isTarget = (node: TNode<unknown>) => node.value === "target";
const isFalse = (node: TNode<unknown>) => false;
let start: TNode<unknown>;
let target: TNode<unknown>;
beforeEach(() => {
  start = new Node("start");
  target = new Node("target");
});

describe("The distance(start, testFn) method", () => {
  test("should return 0 if we are looking for the start node", () => {
    expect(BFS.distance(start, isStart)).toBe(0);
  });
  test("should return null if there is no node that satisfies the test function", () => {
    expect(BFS.distance(start, isFalse)).toBe(null);
  });
  test("should return 1 if the target is a neighbour", () => {
    start.neighbours = [target];
    expect(BFS.distance(start, isTarget)).toBe(1);
  });
  test("should return 2 if the target is a neighbours neighbour", () => {
    let neighbour = new Node("neighbour", [target]);
    start.neighbours = [neighbour];
    expect(BFS.distance(start, isTarget)).toBe(2);
  });
  test("should return null if the target is not reachable but the is a cycle in the graph", () => {
    start.neighbours = [target];
    target.neighbours = [start];
    expect(BFS.distance(start, isFalse)).toBe(null);
  });
});

describe("The find(start, testFn) method", () => {
  test("should return the start node if it satisfies the test function", () => {
    expect(BFS.find(start, isStart)).toBe(start);
  });
  test("should return null if the start node doesnt have neighbours and doesn't satisfies the test function", () => {
    expect(BFS.find(start, isFalse)).toBe(null);
  });
  test("should return the target node, if the start node doesnt have satisfies the test function, but the target does and is one of the neighbours", () => {
    start.neighbours = [target];
    expect(BFS.find(start, isTarget)).toBe(target);
  });
  test("should return the target node if it is a neighbours neighbour and satisfies the test function", () => {
    const neighbour = new Node("neighbour", [target]);
    start.neighbours = [neighbour];
    expect(BFS.find(start, isTarget)).toBe(target);
  });
  test("should return null if the graph has a cycle and there is no node that satisfies the condition", () => {
    start.neighbours = [target];
    target.neighbours = [start];
    expect(BFS.find(start, isFalse)).toBe(null);
  });
  test("should return null if the graph has a cycle deeper down the graph and there is no node that satisfies the condition", () => {
    let next = new Node("next", [target]);
    start.neighbours = [next];
    target.neighbours = [next];
    expect(BFS.find(start, isFalse)).toBe(null);
  });
});

describe("The trace(start, testFunction) method", () => {
  test("should return an array containing the start node if the start node was the target", () => {
    const trace = BFS.trace(start, isStart);
    expect(trace.length).toBe(1);
    expect(trace[0]).toBe(start);
  });
  test("should return an empty array if the target node can't be reached", () => {
    const trace = BFS.trace(start, isTarget);
    expect(trace).toEqual([]);
  });
  test("should return [start, target] if the target is a neighbour", () => {
    let deadend = new Node("deadend");
    start.neighbours = [deadend, target];
    const trace = BFS.trace(start, isTarget);
    expect(trace.length).toBe(2);
    expect(trace[0].value).toBe(start.value);
    expect(trace[1].value).toBe(target.value);
  });
  test("should return [start, neighbour, target] if the target is a neighbours neighbour", () => {
    let deadend = new Node("deadend");
    let neighbour = new Node("neighbour", [target]);
    start.neighbours = [deadend, neighbour];
    const trace = BFS.trace(start, isTarget);
    expect(trace.length).toBe(3);
  });
  test("should return trace if there is a loop from target to start", () => {
    target.neighbours = [start];
    start.neighbours = [target];
    let trace = BFS.trace(start, isTarget);
    expect(trace[0]).toBe(start);
    expect(trace[1]).toBe(target);
    expect(trace.length).toBe(2);
  });
});
