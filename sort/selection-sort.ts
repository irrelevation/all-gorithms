import { ComparisonFunction } from "../types";

function selectionSort<T>(array: T[], compare: ComparisonFunction<T>): T[] {
  const result: T[] = [];
  while (array.length > 0) {
    let smallest_index = 0;
    let smallest = array[0];
    for (let i = 1; i < array.length; i++) {
      if (compare(array[i], smallest) === "<") {
        smallest_index = i;
        smallest = array[i];
      }
    }
    result.push(...array.splice(smallest_index, 1));
  }

  return result;
}

let numbers = [32, 1, 6, 9, 2, 58, 2, 3];
let comp: ComparisonFunction<number> = (a, b) => {
  if (a < b) return "<";
  else if (a === b) return "===";
  else return ">";
};

console.log(selectionSort(numbers, comp));
