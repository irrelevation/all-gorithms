import { Subarray } from "../util/Subarray";

// Partitions a sub-array in place, returning the index at which it is partitioned.
// Every element to the left of that index is smaller, every element to the right of it bigger.
const partition = <T>(subArray: Subarray<T>, pivotIndex?: number) => {
  // If the pivotIndex is ommited we are choosing a random pivot to improve the runtime when dealing with (almost) ordered inputs.
  pivotIndex ??= Math.floor(Math.random() * subArray.length);

  if (pivotIndex < 0 || pivotIndex > subArray.length - 1) {
    throw new Error(
      `Pivot index out of range. Expected integer between 0 and ${
        subArray.length - 1
      } but got ${pivotIndex}`
    );
  }
  const pivotValue = subArray.get(pivotIndex);
  let leftIndex = 0;
  let rightIndex = subArray.length - 1;

  while (leftIndex < rightIndex) {
    while (subArray.get(leftIndex) <= pivotValue && leftIndex < rightIndex) {
      leftIndex++;
    }

    while (subArray.get(rightIndex) >= pivotValue && leftIndex < rightIndex) {
      rightIndex--;
    }

    subArray.swap(leftIndex, rightIndex);
    if (rightIndex - leftIndex <= 1) break;

    leftIndex++;
    rightIndex--;
  }

  if (leftIndex === rightIndex) leftIndex--;

  // TODO Refactor - this works but is horrible code
  if (
    (pivotIndex > rightIndex && pivotValue < subArray.get(rightIndex)) ||
    pivotValue > subArray.get(rightIndex)
  ) {
    subArray.swap(pivotIndex, rightIndex);
    pivotIndex = rightIndex;
  } else if (pivotIndex < leftIndex && pivotValue > subArray.get(leftIndex)) {
    subArray.swap(pivotIndex, leftIndex);
    pivotIndex = leftIndex;
  }
  return pivotIndex;
};

export const quickSortInPlace = <T>(array: T[] | Subarray<T>) => {
  if (array.length <= 1) return;
  if (Array.isArray(array)) array = new Subarray(array);
  const pivotIndex = partition(array);
  const leftSubArray = new Subarray(array, 0, pivotIndex);
  const rightSubArray = new Subarray(array, pivotIndex + 1, array.length);
  quickSortInPlace(leftSubArray);
  quickSortInPlace(rightSubArray);
};
