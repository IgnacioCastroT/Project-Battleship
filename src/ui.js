const renderBoard = (gameboard, elementId, isEnemy = false) => {
  const boardElement = document.getElementById(elementId);
  boardElement.innerHTML = '';

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;

      const cellContent = gameboard.board[row][col];

      // Verificar si fue un miss
      const wasMissed = gameboard.missedAttacks
        .some(([r, c]) => r === row && c === col);

      // Verificar si fue un hit
      const wasHit = gameboard.hitAttacks &&
        gameboard.hitAttacks.some(([r, c]) => r === row && c === col);

      if (wasMissed) {
        cell.classList.add('miss');
      } else if (wasHit) {
        cell.classList.add('hit');
      } else if (!isEnemy && cellContent) {
        cell.classList.add('ship');
      }

      if (isEnemy) cell.classList.add('enemy');

      boardElement.appendChild(cell);
    }
  }
};

const showMessage = (msg) => {
  document.getElementById('message').textContent = msg;
};

module.exports = { renderBoard, showMessage };