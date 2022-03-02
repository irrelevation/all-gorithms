function quickSort<T>(array: T[]): T[] {
  if (array.length === 0) return array;
  const [pivot, ...rest] = array;
  const lower = [];
  const higher = [];
  for (let element of rest) {
    if (element < pivot) {
      lower.push(element);
    } else {
      higher.push(element);
    }
  }
  return [...quickSort(lower), pivot, ...quickSort(higher)];
}
