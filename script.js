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
        ctx.fillStyle = '#81c784';
        ctx.fillRect(posX, posY, tileSize, tileSize);
      } else if (tile === '$') {
        ctx.fillStyle = '#f9a825';
        ctx.beginPath();
        ctx.rect(posX + 8, posY + 8, 24, 24);
        ctx.fill();
      } else if (tile === '.') {
        ctx.fillStyle = '#aed581';
        ctx.beginPath();
        ctx.arc(posX + 20, posY + 20, 6, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(player.x * tileSize + 20, player.y * tileSize + 20, 12, 0, Math.PI * 2);
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

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') move(0, -1);
  if (e.key === 'ArrowDown') move(0, 1);
  if (e.key === 'ArrowLeft') move(-1, 0);
  if (e.key === 'ArrowRight') move(1, 0);
});

drawMap();
