
const TAPS_PER_CRAFT = 250;
const CRAFT_PRICE = 150;
const STORAGE_KEY = "craftCoinsTapDemo_v1";

const el = {
  craft: document.getElementById("craft"),
  coins: document.getElementById("coins"),
  taps: document.getElementById("taps"),
  totalTaps: document.getElementById("totalTaps"),
  purchased: document.getElementById("purchased"),
  progress: document.getElementById("progress"),
  tapButton: document.getElementById("tapButton"),
  buyButton: document.getElementById("buyButton"),
  shopMessage: document.getElementById("shopMessage")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved && Number.isInteger(saved.totalTaps) &&
        saved.totalTaps >= 0) {
      return {
        totalTaps: saved.totalTaps,
        craft: Number.isInteger(saved.craft) &&
          saved.craft >= 0
          ? saved.craft
          : Math.floor(saved.totalTaps / 250),
        coins: Number.isInteger(saved.coins) &&
          saved.coins >= 0 ? saved.coins : 0,
        purchased: Number.isInteger(saved.purchased) &&
          saved.purchased >= 0 ? saved.purchased : 0
      };
    }
  } catch (error) {}

  return {
    totalTaps: 0,
    craft: 0,
    coins: 0,
    purchased: 0
  };
}

let state = loadState();

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}

function render() {
  const progressTaps =
    state.totalTaps % TAPS_PER_CRAFT;

  el.craft.textContent =
    state.craft.toLocaleString("en-US");

  el.coins.textContent =
    state.coins.toLocaleString("en-US");

  el.taps.textContent = progressTaps;

  el.totalTaps.textContent =
    state.totalTaps.toLocaleString("en-US");

  el.purchased.textContent =
    state.purchased.toLocaleString("en-US");

  el.progress.style.width =
    (progressTaps / TAPS_PER_CRAFT * 100) + "%";

  el.buyButton.disabled =
    state.craft < CRAFT_PRICE;
}

// Получение Craft
el.tapButton.addEventListener("click", () => {
  state.totalTaps++;

  if (state.totalTaps % TAPS_PER_CRAFT === 0) {
    state.craft++;
    el.shopMessage.textContent =
      "Получен 1 Craft!";
  }

  saveState();
  render();
});

// Покупка Craft Coins
el.buyButton.addEventListener("click", () => {
  if (state.craft < CRAFT_PRICE) {
    el.shopMessage.textContent =
      "Недостаточно Craft!";
    return;
  }

  state.craft -= CRAFT_PRICE;
  state.coins++;
  state.purchased++;

  saveState();
  render();

  el.shopMessage.textContent =
    "Успешно! Получен 1 Craft Coin.";
});

render();
