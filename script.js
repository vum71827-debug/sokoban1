const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = 48;

let map = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", " ", " ", " ", "#", " ", " ", "#"],
  ["#", " ", "$", " ", " ", ".", "#", " ", " ", "#"],
  ["#", " ", " ", "@", " ", " ", "#", " ", " ", "#"],
  ["#", " ", " ", " ", "$", ".", "#", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]
];

let player = { x: 3, y: 3 };

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      const posX = x * size;
      const posY = y * size;

      if (tile === "#") {
        ctx.fillStyle = "#81c784";
        ctx.fillRect(posX, posY, size, size);
      } else if (tile === ".") {
        ctx.fillStyle = "#aed581";
        ctx.beginPath();
        ctx.arc(posX + size / 2, posY + size / 2, 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (tile === "$") {
        ctx.fillStyle = "#f9a825";
        ctx.fillRect(posX + 10, posY + 10, size - 20, size - 20);
      }
    }
  }

  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(player.x * size + size / 2, player.y * size + size / 2, 12, 0, Math.PI * 2);
  ctx.fill();
}

function move(dx, dy) {
  const nx = player.x + dx;
  const ny = player.y + dy;
  const target = map[ny][nx];
  const beyondX = nx + dx;
  const beyondY = ny + dy;

  if (target === " " || target === ".") {
    player.x = nx;
    player.y = ny;
  } else if (target === "$") {
    const beyond = map[beyondY][beyondX];
    if (beyond === " " || beyond === ".") {
      map[ny][nx] = " ";
      map[beyondY][beyondX] = "$";
      player.x = nx;
      player.y = ny;
    }
  }
  checkWin();
  draw();
}

function checkWin() {
  let done = true;
  for (let row of map) {
    for (let cell of row) {
      if (cell === ".") done = false;
    }
  }
  if (done) setTimeout(() => alert("🎉 Bạn đã hoàn thành trò chơi!"), 100);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") move(0, -1);
  if (e.key === "ArrowDown") move(0, 1);
  if (e.key === "ArrowLeft") move(-1, 0);
  if (e.key === "ArrowRight") move(1, 0);
});

draw();
