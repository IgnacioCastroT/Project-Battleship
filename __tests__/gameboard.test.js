const Gameboard = require('../src/gameboard');
const Ship = require('../src/ship');

test('coloca un barco en el tablero', () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, 0, 0);
  expect(board.board[0][0]).toBe(ship);
  expect(board.board[0][1]).toBe(ship);
  expect(board.board[0][2]).toBe(ship);
});

test('registra un ataque exitoso', () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, 0, 0);
  board.receiveAttack(0, 0);
  expect(ship.hits).toBe(1);
});

test('registra un ataque fallido', () => {
  const board = new Gameboard();
  board.receiveAttack(5, 5);
  expect(board.missedAttacks).toContainEqual([5, 5]);
});

test('sabe cuando todos los barcos están hundidos', () => {
  const board = new Gameboard();
  const ship = new Ship(1);
  board.placeShip(ship, 0, 0);
  board.receiveAttack(0, 0);
  expect(board.allSunk()).toBe(true);
});