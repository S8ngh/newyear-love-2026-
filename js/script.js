console.log("script.js loaded ✅");

/* ===== ELEMENTS ===== */
const loveText = document.getElementById("finalLove");
const teddyWrap = document.querySelector(".teddy-wrap");

/* ===== TEDDY FUNCTION ===== */
function showTeddyKiss() {
  console.log("🧸 Teddy triggered");
  if (teddyWrap) {
    teddyWrap.classList.add("teddy-show");
  }
}

/* ===== NOTIFICATION ===== */
function triggerNotification() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification("❤️ Happy New Year Akriti ❤️", {
      body: "I love you. Always. ♾️",
      icon: "assets/images/pic1.jpg"
    });
  }
}

document.addEventListener("click", () => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});

/* ===== MIDNIGHT CHECK ===== */
function checkMidnight() {
  const now = new Date();

  if (
    now.getHours() === 0 &&
    now.getMinutes() === 0 &&
    now.getSeconds() <= 5
  ) {
    if (loveText) loveText.classList.add("love-show");
    showTeddyKiss();
    triggerNotification();
  }
}

setInterval(checkMidnight, 1000);

/* ===== TEMP TEST (FOR YOU) ===== */
// page load pe test karne ke liye:
setTimeout(() => {
  if (loveText) loveText.classList.add("love-show");
  showTeddyKiss();
}, 2000);











