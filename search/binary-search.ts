export default function binarySearch<T>(
  sortedList: T[],
  searchValue: T
): number | null {
  let lowerBound = 0;
  let upperBound = sortedList.length - 1;

  while (lowerBound <= upperBound) {
    const middleIndex = Math.floor(lowerBound + (upperBound - lowerBound) / 2);
    const candidateValue = sortedList[middleIndex];
    if (searchValue < candidateValue) {
      upperBound = middleIndex - 1;
    } else if (searchValue > candidateValue) {
      lowerBound = middleIndex + 1;
    } else {
      return middleIndex;
    }
  }
  return null;
}
