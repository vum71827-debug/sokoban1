const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const size = 48;
const restartBtn = document.getElementById("restart");
const statusText = document.getElementById("status");

const level = [
  "##########",
  "#        #",
  "#  $. .  #",
  "#  $$@   #",
  "#   .    #",
  "##########"
];

let map = [];
let player = { x: 0, y: 0 };

function resetLevel() {
  map = level.map(row => row.split(""));
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "@") {
        player = { x, y };
      }
    }
  }
  statusText.textContent = "";
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      const posX = x * size;
      const posY = y * size;

      // Nền
      ctx.fillStyle = "#f4f1d0";
      ctx.fillRect(posX, posY, size, size);

      if (tile === "#") {
        ctx.fillStyle = "#555";
        ctx.fillRect(posX, posY, size, size);
      } else if (tile === ".") {
        ctx.fillStyle = "#e57373";
        ctx.beginPath();
        ctx.arc(posX + size / 2, posY + size / 2, 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (tile === "$") {
        ctx.fillStyle = "#f9a825";
        ctx.fillRect(posX + 8, posY + 8, size - 16, size - 16);
      } else if (tile === "*") {
        ctx.fillStyle = "#4caf50";
        ctx.fillRect(posX + 8, posY + 8, size - 16, size - 16);
      }
    }
  }

  // Vẽ người chơi
  ctx.fillStyle = "#1976d2";
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
    updatePlayer(nx, ny);
  } else if (target === "$" || target === "*") {
    const beyond = map[beyondY][beyondX];
    if (beyond === " " || beyond === ".") {
      // Di chuyển thùng
      map[beyondY][beyondX] = beyond === "." ? "*" : "$";
      map[ny][nx] = map[ny][nx] === "*" ? "." : " ";
      updatePlayer(nx, ny);
    }
  }

  draw();
  checkWin();
}

function updatePlayer(nx, ny) {
  const onGoal = level[player.y][player.x] === ".";
  map[player.y][player.x] = onGoal ? "." : " ";
  player.x = nx;
  player.y = ny;
  map[player.y][player.x] = "@";
}

function checkWin() {
  let won = true;
  for (let row of map) {
    if (row.includes(".")) {
      won = false;
      break;
    }
  }
  if (won) {
    statusText.textContent = "🎉 Bạn đã thắng!";
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") move(0, -1);
  if (e.key === "ArrowDown") move(0, 1);
  if (e.key === "ArrowLeft") move(-1, 0);
  if (e.key === "ArrowRight") move(1, 0);
});

restartBtn.addEventListener("click", resetLevel);

resetLevel();
