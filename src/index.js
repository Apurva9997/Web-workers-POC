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

const ITERATIONS = 100;
const PROGRESS_THRESHHOLD = 0.1 * ITERATIONS;
let PROGRESS = 0;
const worker = new Worker("./worker.js");

function sortList() {
  console.log("Sort list normal called.");
  resetProgress();
  for (let i = 0; i < ITERATIONS; i++) {
    if (sortedListContainer.childElementCount === 2) {
      sortedListContainer.removeChild(ol);
      sortedListContainer.appendChild(document.createElement('ul'));
      ol = document.querySelector(".sorted-list ul");
    }
    let sorted_array = bubble_Sort(list);
    if (i === ITERATIONS - 1) {
      console.log("current iteration ", i);
      sorted_array.forEach(function (item) {
        let listItem = document.createElement('li');
        listItem.innerText = item;
        ol.appendChild(listItem);
      })
    }
    PROGRESS++;
    progress(PROGRESS, ITERATIONS);
  }
  PROGRESS = 0;
}

let iterations_processed = 0;
let sorted_array = [];

function webWorkerProcess() {
  if (sortedListContainer.childElementCount === 2) {
    sortedListContainer.removeChild(ol);
    sortedListContainer.appendChild(document.createElement('ul'));
    ol = document.querySelector(".sorted-list ul");
  }
  if (iterations_processed !== ITERATIONS) {
    new Promise((resolve, reject) => {
      console.log("sending request to worker.");
      worker.postMessage({ list });
      worker.onmessage = function (event) {
        console.log("got the sorted data from worker", event);
        sorted_array = event.data.data;
        resolve();
      }
    }).then((data) => {
      ++iterations_processed;
      PROGRESS++;
      progress(PROGRESS, ITERATIONS);
      webWorkerProcess();
    })
      .catch((err) => console.log(err))
  }
  else {
    console.log("last iteration processed");
    iterations_processed = 0;
    PROGRESS = 0;
    sorted_array.forEach(function (item) {
      let listItem = document.createElement('li');
      listItem.innerText = item;
      ol.appendChild(listItem);
    })
    return
  }
  // worker.terminate();
}

function sortListWebWorker() {
  console.log("Sort list web worker verison called.");
  resetProgress();
  webWorkerProcess();
}