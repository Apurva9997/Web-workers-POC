if ('Worker' in window) {
  alert("Voila workers are supported");
}
else {
  alert("Uhh Wokers aren't supprted by your browser yet :(")
}

function swap(arr, first_Index, second_Index) {
  var temp = arr[first_Index];
  arr[first_Index] = arr[second_Index];
  arr[second_Index] = temp;
}

function bubble_Sort(arr) {

  var len = arr.length,
    i, j, stop;

  for (i = 0; i < len; i++) {
    for (j = 0, stop = len - i; j < stop; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;
}

let sortedListContainer = document.querySelector(".sorted-list");
let ol = document.querySelector(".sorted-list ul");

const ITERATIONS = 10;
const PROGRESS_THRESHHOLD = 0.1 * ITERATIONS;
let PROGRESS = 0;

function sortList() {
  for (let i = 0; i < ITERATIONS; i++) {
    if (sortedListContainer.childElementCount === 2) {
      sortedListContainer.removeChild(ol);
      sortedListContainer.appendChild(document.createElement('ul'));
      ol = document.querySelector(".sorted-list ul");
    }
    let sorted_array = bubble_Sort(list);
    sorted_array.forEach(function (item) {
      let listItem = document.createElement('li');
      listItem.innerText = item;
      ol.appendChild(listItem);
    })
    if (Number.isInteger((i + 1) % ITERATIONS) && i + 1 === PROGRESS_THRESHHOLD) {
      PROGRESS++;
      progress();
    }
  }
}

function sortListWebWorker() {
  let worker = new Worker("./worker.js");
  for (let i = 0; i < ITERATIONS; i++) {
    if (sortedListContainer.childElementCount === 2) {
      sortedListContainer.removeChild(ol);
      sortedListContainer.appendChild(document.createElement('ul'));
      ol = document.querySelector(".sorted-list ul");
    }
    worker.postMessage(list);
    worker.onmessage = function (event) {
      let sorted_array = event.data;
      sorted_array.forEach(function (item) {
        let listItem = document.createElement('li');
        listItem.innerText = item;
        ol.appendChild(listItem);
      })
    }
    if (Number.isInteger((i + 1) % ITERATIONS) && i + 1 === PROGRESS_THRESHHOLD) {
      PROGRESS++;
      progress();
    }
  }
  worker.terminate();
}