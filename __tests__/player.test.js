const Player = require('../src/player');
const Ship = require('../src/ship');

test('el jugador tiene su propio tablero', () => {
  const player = new Player();
  expect(player.gameboard).toBeDefined();
});

test('el jugador ataca una celda', () => {
  const player = new Player();
  const enemy = new Player();
  const ship = new Ship(3);
  enemy.gameboard.placeShip(ship, 0, 0);
  player.attack(enemy.gameboard, 0, 0);
  expect(ship.hits).toBe(1);
});

test('la CPU no repite coordenadas', () => {
  const cpu = new Player('cpu');
  const enemy = new Player();
  for (let i = 0; i < 50; i++) {
    cpu.randomAttack(enemy.gameboard);
  }
  const unique = new Set(cpu.attackedCells.map(([r, c]) => `${r},${c}`));
  expect(unique.size).toBe(50);
});