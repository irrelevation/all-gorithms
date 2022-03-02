function binarySearchRecursive<T>(sortedList: T[], searchValue: T): number {
  if (sortedList.length === 0) return -1;

  const lowerBound = 0;
  const upperBound = sortedList.length;
  const candidateIndex = lowerBound + Math.floor((upperBound - lowerBound) / 2);
  const candidate = sortedList[candidateIndex];

  if (searchValue === candidate) {
    return candidateIndex;
  } else if (searchValue < candidate) {
    return binarySearchRecursive(
      sortedList.slice(0, candidateIndex),
      searchValue
    );
  } else {
    const result = binarySearchRecursive(
      sortedList.slice(candidateIndex + 1, upperBound),
      searchValue
    );
    return result === -1 ? -1 : result + candidateIndex + 1;
  }
}
