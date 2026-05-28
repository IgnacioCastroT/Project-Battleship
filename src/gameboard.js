class Gameboard {
  constructor() {
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    this.missedAttacks = [];
    this.hitAttacks = [];
    this.ships = [];
  }

  placeShip(ship, row, col, isHorizontal = true) {
    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        this.board[row][col + i] = ship;
      } else {
        this.board[row + i][col] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack(row, col) {
    const cell = this.board[row][col];
    if (cell) {
      cell.hit();
      this.hitAttacks.push([row, col]);
    } else {
      this.missedAttacks.push([row, col]);
    }
  }

  allSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}

module.exports = Gameboard;