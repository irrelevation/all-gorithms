import { ComparisonFunction } from "../types";

export default function binarySearch<T>(
  sortedList: T[],
  searchValue: T,
  compare: ComparisonFunction<T>
): number | null {
  let low = 0;
  let high = sortedList.length - 1;

  while (low <= high) {
    const index = Math.floor(low + (high - low) / 2);
    const candidateValue = sortedList[index];
    const result = compare(searchValue, candidateValue);
    switch (result) {
      case "<":
        high = index - 1;
        break;
      case ">":
        low = index + 1;
        break;
      case "===":
        return index;
    }
  }
  return null;
}
