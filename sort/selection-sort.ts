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

let numbers = [32, 1, 6, 9, 2, 58, 2, 3];

console.log(selectionSort(numbers));
