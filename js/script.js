/* ================= FIREWORKS ================= */
console.log("SCRIPT JS LOADED");


const fwCanvas = document.getElementById("fireworks");

if (fwCanvas) {
  const ctx = fwCanvas.getContext("2d");

  function resize() {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  let fireworks = [];
  let particles = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Firework() {
    this.x = random(0, fwCanvas.width);
    this.y = fwCanvas.height;
    this.targetY = random(80, fwCanvas.height / 2);
    this.color = `hsl(${random(0,360)},100%,60%)`;
    this.speed = random(4,7);
  }

  Firework.prototype.update = function () {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      explode(this.x, this.y, this.color);
      return false;
    }
    return true;
  };

  Firework.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  function explode(x, y, color) {
    for (let i = 0; i < 40; i++) {
      particles.push({
        x, y,
        vx: random(-4,4),
        vy: random(-4,4),
        life: 60,
        color
      });
    }
  }

  function animate() {
    ctx.clearRect(0,0,fwCanvas.width,fwCanvas.height);

    if (Math.random() < 0.06) {
      fireworks.push(new Firework());
    }

    fireworks = fireworks.filter(fw => {
      fw.draw();
      return fw.update();
    });

    particles = particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 2, 2);
      return p.life > 0;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ================= COUNTDOWN ================= */

const newYear = new Date("January 1, 2026 00:00:00").getTime();

setInterval(() => {
  const daysEl = document.getElementById("days");
  if (!daysEl) return; // surprise page safe

  const now = new Date().getTime();
  const diff = newYear - now;

  document.getElementById("days").innerText =
    Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText =
    Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").innerText =
    Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").innerText =
    Math.floor((diff / 1000) % 60);
}, 1000);
/* ===== FINAL I LOVE YOU REVEAL AT 12 ===== */
const loveText = document.getElementById("finalLove");

function checkMidnight() {
  const now = new Date();
  if (
    now.getHours() === 0 &&
    now.getMinutes() === 0 &&
    now.getSeconds() <= 5
  
  
  ) {
  if (loveText) {
    loveText.classList.add("love-show");
  }

  showTeddyKiss();        // 🧸 YAHI ADD KARO

  triggerNotification();
}
}

setInterval(checkMidnight, 1000);
// 🧸 Teddy kiss trigger
const teddyWrap = document.querySelector(".teddy-wrap");

function showTeddyKiss() {
  if (teddyWrap) {
    teddyWrap.classList.add("teddy-show");
  }
}


/* ===== NOTIFICATION PERMISSION ===== */
function triggerNotification() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification("❤️ Happy New Year ❤️", {
      body: "I Love You. Always. ♾️",
      icon: "assets/images/pic1.jpg"
    });
  }
}

document.addEventListener("click", () => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});
// 🔥 TEMP TEST BUTTON
const testBtn = document.getElementById("testBtn");

if (testBtn) {
  testBtn.addEventListener("click", () => {
    if (loveText) loveText.classList.add("love-show");
    showTeddyKiss();
    triggerNotification();
  });
}








