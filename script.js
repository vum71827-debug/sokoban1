const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 40;

const map = [
  ['#','#','#','#','#','#','#','#','#','#'],
  ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
  ['#',' ','$',' ',' ','.',' ',' ',' ','#'],
  ['#',' ',' ','@',' ',' ',' ',' ',' ','#'],
  ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
  ['#',' ',' ',' ',' ',' ',' ',' ',' ','#'],
  ['#','#','#','#','#','#','#','#','#','#']
];

let player = { x: 3, y: 3 };

function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      const posX = x * tileSize;
      const posY = y * tileSize;

      if (tile === '#') {
        ctx.fillStyle = '#a5d6a7';
        ctx.fillRect(posX, posY, tileSize, tileSize);
      } else if (tile === '$') {
        ctx.fillStyle = '#fbc02d';
        ctx.fillRect(posX + 10, posY + 10, 20, 20);
      } else if (tile === '.') {
        ctx.fillStyle = '#81c784';
        ctx.beginPath();
        ctx.arc(posX + 20, posY + 20, 6, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
  ctx.fillStyle = '#1565c0';
  ctx.beginPath();
  ctx.arc(player.x * tileSize + 20, player.y * tileSize + 20, 10, 0, Math.PI * 2);
  ctx.fill();
}

function move(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;
  const nextTile = map[newY][newX];
  if (nextTile === ' ' || nextTile === '.') {
    player.x = newX;
    player.y = newY;
  }
  drawMap();
}

document.getElementById('up').addEventListener('click', () => move(0, -1));
document.getElementById('down').addEventListener('click', () => move(0, 1));
document.getElementById('left').addEventListener('click', () => move(-1, 0));
document.getElementById('right').addEventListener('click', () => move(1, 0));

document.getElementById('submit').addEventListener('click', () => {
  alert('Bài tập Sokoban đã hoàn thành!');
});

drawMap();
