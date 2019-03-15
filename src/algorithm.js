export function sort(arr, key) {
  let done = false;
  while (!done) {
    done = true;
    for (var i = 1; i < arr.length; i += 1) {
      if (arr[i - 1][key] > arr[i][key]) {
        done = false;
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
      }
    }
  }
  return arr;
}