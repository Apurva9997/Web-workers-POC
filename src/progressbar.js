let progressBar = document.querySelector(".progress-bar");
const resetProgress = () => {
  document.querySelector("#progress-bar-container").removeChild(progressBar);
  const newProgressBar = document.createElement('div');
  newProgressBar.className = "progress-bar";
  document.querySelector("#progress-bar-container").appendChild(newProgressBar);
  progressBar = document.querySelector(".progress-bar");
}
function progress(completed, total) {
  let previousProgress = progressBar.childElementCount;
  let currentProgress = (completed / total) * 10;
  let progress_gain = parseInt(currentProgress - previousProgress);
  console.log("previousProgress, currentProgress", previousProgress, currentProgress);
  for (let i = 0; i < progress_gain; i++) {
    let progressItem = document.createElement('div');
    progressItem.className = "progress-bar-item";
    progressBar.appendChild(progressItem);
  }
}