// TYPEWRITER
const titleEl = document.getElementById("typeTitle");
if (titleEl) {
  const text = titleEl.getAttribute("data-text");
  let i = 0;
  titleEl.textContent = "";
  function typeWriter() {
    if (i < text.length) {
      titleEl.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 60);
    }
  }
  typeWriter();
}

// POPUP FOTO
document.querySelectorAll(".frame img").forEach(img => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,.85);
      display:flex; align-items:center; justify-content:center;
      z-index:20000;
    `;
    const big = document.createElement("img");
    big.src = img.src;
    big.style.maxWidth = "90%";
    big.style.maxHeight = "90%";
    big.style.borderRadius = "12px";
    overlay.appendChild(big);
    document.body.appendChild(overlay);
    overlay.addEventListener("click", () => overlay.remove());
  });
});

// MUSIC
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");
let playing = false;

btn.addEventListener("click", () => {
  if (!playing) {
    music.play();
    btn.textContent = "⏸ Pause Music";
    playing = true;
  } else {
    music.pause();
    btn.textContent = "▶ Play Music";
    playing = false;
  }
});

// HEARTS
// HEARTS (BENTUK LOVE)
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

const hearts = Array.from({ length: 40 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 10 + 6,
  speed: Math.random() * 1 + 0.5,
  alpha: Math.random() * 0.5 + 0.5
}));

function drawHeart(h) {
  ctx.fillStyle = `rgba(255, 100, 150, ${h.alpha})`;
  ctx.beginPath();
  ctx.moveTo(h.x, h.y);
  ctx.bezierCurveTo(
    h.x - h.size, h.y - h.size,
    h.x - h.size * 2, h.y + h.size / 2,
    h.x, h.y + h.size
  );
  ctx.bezierCurveTo(
    h.x + h.size * 2, h.y + h.size / 2,
    h.x + h.size, h.y - h.size,
    h.x, h.y
  );
  ctx.fill();
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    h.y -= h.speed;
    if (h.y < -20) {
      h.y = canvas.height + 20;
      h.x = Math.random() * canvas.width;
    }
    drawHeart(h);
  });
  requestAnimationFrame(animateHearts);
}

animateHearts();
// REVEAL
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  const h = window.innerHeight;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < h - 100) el.classList.add("active");
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// OPEN LETTER
const envelope = document.getElementById("openLetter");
envelope.addEventListener("click", () => envelope.classList.toggle("open"));

// GATE
const gate = document.getElementById("gate");
const enterBtn = document.getElementById("enterBtn");
enterBtn.addEventListener("click", () => {
  music.play();
  btn.textContent = "⏸ Pause Music";
  gate.classList.add("hide");
  setTimeout(() => gate.remove(), 700);
});