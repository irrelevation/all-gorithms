export interface Node<T> {
  value: T;
  neighbours: Node<T>[];
}
