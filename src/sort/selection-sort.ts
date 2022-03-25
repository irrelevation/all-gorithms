function selectionSort<T>(array: T[]): T[] {
  const result: T[] = [];
  while (array.length > 0) {
    let smallestCandidateIndex = 0;
    let smallestCandidate = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] < smallestCandidate) {
        smallestCandidateIndex = i;
        smallestCandidate = array[i];
      }
    }
    result.push(...array.splice(smallestCandidateIndex, 1));
  }

  return result;
}
