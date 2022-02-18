import { ComparisonFunction } from "../types";

function quickSort<T>(array: T[], compare: ComparisonFunction<T>): T[] {
  if (array.length === 0) return array;
  const [pivot, ...rest] = array;
  const lower = [];
  const higher = [];
  for (let element of rest) {
    if (compare(element, pivot) === "<") lower.push(element);
    else higher.push(element);
  }
  return [...quickSort(lower, compare), pivot, ...quickSort(higher, compare)];
}

let numbers = [32, 1, 6, 9, 2, 58, 2, 3];
let comp: ComparisonFunction<number> = (a, b) => {
  if (a < b) return "<";
  else if (a === b) return "===";
  else return ">";
};

console.log(quickSort(numbers, comp));
