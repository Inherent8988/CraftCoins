const TAPS_PER_COIN = 500;
const STORAGE_KEY = "craftCoinsTapDemo_v1";

const els = {
  coins: document.getElementById("coins"),
  taps: document.getElementById("taps"),
  totalTaps: document.getElementById("totalTaps"),
  earned: document.getElementById("earned"),
  progress: document.getElementById("progress"),
  tapButton: document.getElementById("tapButton"),
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Number.isInteger(saved.totalTaps) && saved.totalTaps >= 0) {
      return { totalTaps: saved.totalTaps };
    }
  } catch (_) {}
  return { totalTaps: 0 };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  const coins = Math.floor(state.totalTaps / TAPS_PER_COIN);
  const progressTaps = state.totalTaps % TAPS_PER_COIN;
  els.coins.textContent = coins.toLocaleString("en-US");
  els.taps.textContent = progressTaps;
  els.totalTaps.textContent = state.totalTaps.toLocaleString("en-US");
  els.earned.textContent = coins.toLocaleString("en-US");
  els.progress.style.width = `${(progressTaps / TAPS_PER_COIN) * 100}%`;
}

els.tapButton.addEventListener("click", () => {
  state.totalTaps += 1;
  saveState();
  render();
});
render();
