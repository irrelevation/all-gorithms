import { ComparisonFunction } from "../types";
import { Subarray } from "../util/Subarray";

// Partitions a sub-array in place, returning the index at which it is partitioned. Every element to the left of that index is smaller, every element to the right of it bigger.
const partition = <T>(
  subArray: Subarray<T>,
  compare: ComparisonFunction<T>
) => {
  // What happens if the pivot index happens to be the first / last index of the sub array?
  let pivotIndex = Math.floor(Math.random() * subArray.length);
  const pivotValue = subArray.get(pivotIndex);
  let leftPointer = 0;
  let rightPointer = subArray.length - 1;

  // This whole thing can be optimized by swapping with a value that needs to be swapped anyway. Take care to skip pivot.
  // 1. shift left Pointer to the right until it reaches an item that needs to be swapped
  // 2. shift right pointer to the left until it reaches an item that needs to be swapped
  // 3. swap them
  while (leftPointer < rightPointer) {
    const leftBiggerThanPivot =
      compare(subArray.get(leftPointer), pivotValue) === ">";
    if (leftBiggerThanPivot) {
      subArray.swap(leftPointer, rightPointer);
      rightPointer -= 1;
      // skip the pivot
      if (rightPointer === pivotIndex) rightPointer -= 1;
    } else {
      leftPointer += 1;
      // skip the pivot
      if (leftPointer === pivotIndex) leftPointer += 1;
    }
  }
  const leftValue = subArray.get(leftPointer);

  if (
    (pivotIndex > leftPointer && pivotValue < leftValue) ||
    (pivotIndex < leftPointer && pivotValue > leftValue)
  ) {
    subArray.swap(pivotIndex, leftPointer);
    return leftPointer;
  } else {
    return pivotIndex;
  }
};

const quickSortInPlace = <T>(
  subArray: Subarray<T>,
  compare: ComparisonFunction<T>
) => {
  if (subArray.length <= 1) return;
  const pivotIndex = partition(subArray, compare);
  const leftSubArray = new Subarray(subArray, 0, pivotIndex);
  // What happens in case the pivot index is the last element of the array?
  const rightSubArray = new Subarray(subArray, pivotIndex + 1, subArray.length);
  quickSortInPlace(leftSubArray, compare);
  quickSortInPlace(rightSubArray, compare);
};

const randomNumbers: number[] = [
  2, 60, 77, 29, 20, 88, 96, 46, 81, 22, 85, 33, 65, 34, 93, 63, 45, 48, 44, 16,
  29, 80, 62, 36, 38, 1, 81, 58, 48,
];
// for (let i = 0; i < 30; i++) {
//   randomNumbers.push(Math.floor(Math.random() * 100));
// }
let comp: ComparisonFunction<number> = (a, b) => {
  if (a < b) return "<";
  else if (a === b) return "===";
  else return ">";
};

console.log(JSON.stringify(randomNumbers));
quickSortInPlace(new Subarray(randomNumbers), comp);
console.log(JSON.stringify(randomNumbers));
console.log(JSON.stringify(randomNumbers.sort((a, b) => a - b)));
