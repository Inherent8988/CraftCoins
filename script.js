
const TAPS_PER_CRAFT = 250;
const CRAFT_PRICE = 150;
const STORAGE_KEY = "craftCoinsTapDemo_v1";

let state = {
  totalTaps: 0,
  craft: 0,
  coins: 0,
  purchased: 0
};

// Загружаем сохранение
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (saved && typeof saved === "object") {
    state.totalTaps = Number(saved.totalTaps) || 0;
    state.craft = Number(saved.craft) || 0;
    state.coins = Number(saved.coins) || 0;
    state.purchased = Number(saved.purchased) || 0;
  }
} catch (error) {
  console.log("Не удалось загрузить сохранение");
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  document.getElementById("craft").textContent = state.craft;
  document.getElementById("coins").textContent = state.coins;
  document.getElementById("totalTaps").textContent = state.totalTaps;
  document.getElementById("purchased").textContent = state.purchased;

  const remaining = TAPS_PER_CRAFT -
    (state.totalTaps % TAPS_PER_CRAFT);

  document.getElementById("progress").textContent = remaining;
}

// Нажатие на кнопку
document.getElementById("tapButton").addEventListener("click", () => {
  state.totalTaps++;

  if (state.totalTaps % TAPS_PER_CRAFT === 0) {
    state.craft++;
  }

  save();
  render();
});

// Покупка CraftCoins
document.getElementById("buyButton").addEventListener("click", () => {
  const message = document.getElementById("shopMessage");

  if (state.craft < CRAFT_PRICE) {
    message.textContent = "Недостаточно Craft!";
    return;
  }

  state.craft -= CRAFT_PRICE;
  state.coins++;
  state.purchased++;

  message.textContent = "Покупка успешна! +1 CraftCoins";

  save();
  render();
});

render();
