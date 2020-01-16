const progressBar = document.querySelector(".progress-bar");
function progress() {
  let progressItem = document.createElement('div');
  progressItem.className = "progress-bar-item";
  progressBar.appendChild(progressItem);
}