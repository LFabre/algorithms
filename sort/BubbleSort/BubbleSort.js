// References:
//  - https://www.geeksforgeeks.org/bubble-sort/
//
// Time Complexity  - O(N^2)
// Space Complexity - O(1)
//
// Worst Case
//  - When Elements are in decreasing order

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

console.log(bubbleSort([3, 2, 1]));
console.log(bubbleSort([1, 2, 3]));
console.log(bubbleSort([3, 1, 2]));
