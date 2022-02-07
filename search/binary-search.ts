export default function binarySearch<T>(
  sortedList: T[],
  searchValue: T,
  compare: (a: T, b: T) => -1 | 0 | 1
): number | null {
  let low = 0;
  let high = sortedList.length - 1;

  while (low <= high) {
    const index = Math.floor(low + (high - low) / 2);
    const candidateValue = sortedList[index];
    const result = compare(searchValue, candidateValue);
    switch (result) {
      case -1:
        // searchValue < candidateValue
        high = index - 1;
        break;
      case 1:
        // searchValue > candidateValue
        low = index + 1;
        break;
      case 0:
        // searchValue = candidateValue
        return index;
    }
  }
  return null;
}
