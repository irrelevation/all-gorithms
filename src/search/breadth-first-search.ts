import { Node } from "../types";

type TestFunction<T> = (node: Node<T>) => boolean;
export const BFS = {
  distance<T>(from: Node<T>, to: Node<T>): number {
    return -1;
  },
  find<T>(start: Node<T>, test: TestFunction<T>): Node<T> | null {
    if (test(start)) return start;
    let queue = [...start.neighbours];
    let visited = new Set();
    visited.add(start);
    while (queue.length > 0) {
      const node = queue.shift() as Node<T>;
      if (visited.has(node)) continue;
      if (test(node)) return node;
      queue.push(...node.neighbours);
    }
    return null;
  },
};
