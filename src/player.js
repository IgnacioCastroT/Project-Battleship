const Gameboard = require('./gameboard');

class Player {
  constructor(type = 'human') {
    this.type = type;
    this.gameboard = new Gameboard();
    this.attackedCells = [];
  }

  attack(gameboard, row, col) {
    gameboard.receiveAttack(row, col);
    this.attackedCells.push([row, col]);
  }

  randomAttack(gameboard) {
    let row, col;

    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (this.attackedCells.some(([r, c]) => r === row && c === col));

    this.attack(gameboard, row, col);
  }
}

module.exports = Player;