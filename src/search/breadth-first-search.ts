import { Node } from "../types";

type TestFunction<T> = (node: Node<T>) => boolean;
export const BFS = {
  findNodeAndDistance<T>(
    start: Node<T>,
    test: TestFunction<T>
  ): { node: Node<T> | null; distance: number | null } {
    if (test(start)) return { node: start, distance: 0 };
    let queue = [...start.neighbours].map((node) => {
      return { node, distance: 1 };
    });
    let visited = new Set();
    visited.add(start);
    while (queue.length > 0) {
      const { node, distance } = queue.shift() as {
        node: Node<T>;
        distance: number;
      };
      if (visited.has(node)) continue;

      if (test(node)) return { node, distance };
      queue.push(
        ...node.neighbours.map((node) => {
          return { node, distance: distance + 1 };
        })
      );
      visited.add(node);
    }

    return { node: null, distance: null };
  },
  distance<T>(start: Node<T>, test: TestFunction<T>): number | null {
    const { distance } = this.findNodeAndDistance(start, test);
    return distance;
  },
  find<T>(start: Node<T>, test: TestFunction<T>): Node<T> | null {
    const { node } = this.findNodeAndDistance(start, test);
    return node;
  },
};
