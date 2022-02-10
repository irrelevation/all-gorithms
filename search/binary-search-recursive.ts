import { ComparisonFunction } from "../types";

function binarySearchRecursive<T>(
  sortedList: T[],
  searchValue: T,
  compare: ComparisonFunction<T>
): number {
  if (sortedList.length === 0) return -1;
  const low = 0;
  const high = sortedList.length;
  const index = low + Math.floor((high - low) / 2);
  const candidate = sortedList[index];
  const comparison = compare(searchValue, candidate);
  if (comparison === "===") return index;
  else if (comparison === "<")
    return binarySearchRecursive(
      sortedList.slice(0, index),
      searchValue,
      compare
    );
  else {
    const result = binarySearchRecursive(
      sortedList.slice(index + 1, high),
      searchValue,
      compare
    );
    return result === -1 ? -1 : result + index + 1;
  }
}
