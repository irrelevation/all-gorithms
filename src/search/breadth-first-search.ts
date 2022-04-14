import { Node } from "../types";

type TestFunction<T> = (node: Node<T>) => boolean;
export const BFS = {
  distance<T>(start: Node<T>, test: TestFunction<T>): number | null {
    let distance = this.trace(start, test).length - 1;
    return distance === -1 ? null: distance
  },
  find<T>(start: Node<T>, test: TestFunction<T>): Node<T> | null {
    return this.trace(start, test).at(-1) ?? null;
  },
  trace<T>(start: Node<T>, test: TestFunction<T>): Trace<T> {
    let queue: TracedNode<T>[] = [{ node: start, trace: [] }];
    let visited = new Set();

    while (queue.length > 0) {
      const { node, trace } = queue.shift() as TracedNode<T>;
      if (visited.has(node)) continue;

      if (test(node)) return [...trace, node];
      queue.push(
        ...node.neighbours.map((next) => {
          return { node: next, trace: [...trace, node] };
        })
      );
      visited.add(node);
    }

    return [];
  },
};
type Trace<T> = Node<T>[];
interface TracedNode<T> {
  node: Node<T>;
  trace: Trace<T>;
}
