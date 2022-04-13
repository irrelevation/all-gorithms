export default class Node<T> {
  constructor(
    public value: T | null = null,
    public neighbours: Node<T>[] = []
  ) {}
}
