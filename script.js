const TAPS_PER_CRAFT = 250;
const CRAFT_PRICE = 150;
const STORAGE_KEY = "craftCoinsTapDemo_v1";

const els = {
  craft: document.getElementById("craft"),
  coins: document.getElementById("coins"),
  taps: document.getElementById("taps"),
  totalTaps: document.getElementById("totalTaps"),
  earned: document.getElementById("earned"),
  progress: document.getElementById("progress"),
  tapButton: document.getElementById("tapButton"),
  buyButton: document.getElementById("buyButton"),
  shopMessage: document.getElementById("shopMessage"),
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Number.isInteger(saved.totalTaps) && saved.totalTaps >= 0) {
      // Совместимость с V1.1: старые нажатия сохраняются и пересчитываются
      // по новой системе. Старый CFC был вычисляемым, поэтому новый баланс CFC = 0.
      return {
        totalTaps: saved.totalTaps,
        craft: Number.isInteger(saved.craft) && saved.craft >= 0
          ? saved.craft
          : Math.floor(saved.totalTaps / TAPS_PER_CRAFT),
        coins: Number.isInteger(saved.coins) && saved.coins >= 0 ? saved.coins : 0,
        purchased: Number.isInteger(saved.purchased) && saved.purchased >= 0
          ? saved.purchased
          : 0,
      };
    }
  } catch (_) {}
  return { totalTaps: 0, craft: 0, coins: 0, purchased: 0 };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  const progressTaps = state.totalTaps % TAPS_PER_CRAFT;
  els.craft.textContent = state.craft.toLocaleString("en-US");
  els.coins.textContent = state.coins.toLocaleString("en-US");
  els.taps.textContent = progressTaps;
  els.totalTaps.textContent = state.totalTaps.toLocaleString("en-US");
  els.earned.textContent = state.purchased.toLocaleString("en-US");
  els.progress.style.width = `${(progressTaps / TAPS_PER_CRAFT) * 100}%`;
}

els.tapButton.addEventListener("click", () => {
  state.totalTaps += 1;
  if (state.totalTaps % TAPS_PER_CRAFT === 0) {
    state.craft += 1;
  }
  saveState();
  render();
});

els.buyButton.addEventListener("click", () => {
  if (state.craft < CRAFT_PRICE) {
    els.shopMessage.textContent = "Недостаточно Craft! Нужно 150 Craft.";
    return;
  }

  state.craft -= CRAFT_PRICE;
  state.coins += 1;
  state.purchased += 1;
  els.shopMessage.textContent = "Покупка успешна! +1 CraftCoins.";
  saveState();
  render();
});

saveState();
render();
