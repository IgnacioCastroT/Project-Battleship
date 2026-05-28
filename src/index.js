import './style.css';
const Player = require('./player');
const Ship = require('./ship');
const { renderBoard, showMessage } = require('./ui');

const human = new Player('human');
const cpu = new Player('cpu');

// Barcos a colocar
const shipSizes = [
  { name: 'Portaaviones', length: 4 },
  { name: 'Acorazado', length: 3 },
  { name: 'Crucero', length: 3 },
  { name: 'Destructor', length: 2 },
  { name: 'Submarino', length: 2 },
];

let currentShipIndex = 0;
let isHorizontal = true;
let gameOver = false;

// --- SETUP ---

const renderSetupBoard = () => {
  const boardElement = document.getElementById('setup-board');
  boardElement.innerHTML = '';

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;

      const cellContent = human.gameboard.board[row][col];
      if (cellContent) cell.classList.add('ship');

      cell.addEventListener('mouseenter', handlePreview);
      cell.addEventListener('mouseleave', clearPreview);
      cell.addEventListener('click', handlePlaceShip);

      boardElement.appendChild(cell);
    }
  }
};

const handlePreview = (e) => {
  if (currentShipIndex >= shipSizes.length) return;
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  const length = shipSizes[currentShipIndex].length;

  clearPreview();

  for (let i = 0; i < length; i++) {
    const r = isHorizontal ? row : row + i;
    const c = isHorizontal ? col + i : col;
    if (r >= 10 || c >= 10) continue;
    const cell = document.querySelector(
      `#setup-board .cell[data-row="${r}"][data-col="${c}"]`
    );
    if (cell) {
      cell.classList.add(human.gameboard.board[r][c] ? 'invalid' : 'preview');
    }
  }
};

const clearPreview = () => {
  document.querySelectorAll('#setup-board .cell').forEach(cell => {
    cell.classList.remove('preview', 'invalid');
  });
};

const handlePlaceShip = (e) => {
  if (currentShipIndex >= shipSizes.length) return;
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  const { length, name } = shipSizes[currentShipIndex];

  // Verificar que cabe
  for (let i = 0; i < length; i++) {
    const r = isHorizontal ? row : row + i;
    const c = isHorizontal ? col + i : col;
    if (r >= 10 || c >= 10 || human.gameboard.board[r][c]) return;
  }

  const ship = new Ship(length);
  human.gameboard.placeShip(ship, row, col, isHorizontal);
  currentShipIndex++;

  if (currentShipIndex >= shipSizes.length) {
    startGame();
  } else {
    updateShipInfo();
    renderSetupBoard();
  }
};


const placeHumanShipsRandomly = () => {
  // Resetear tablero
  human.gameboard.board = Array(10).fill(null).map(() => Array(10).fill(null));
  human.gameboard.ships = [];
  currentShipIndex = 0;

  shipSizes.forEach(({ length }) => {
    const ship = new Ship(length);
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const horizontal = Math.random() > 0.5;
      let fits = true;
      for (let i = 0; i < length; i++) {
        const r = horizontal ? row : row + i;
        const c = horizontal ? col + i : col;
        if (r >= 10 || c >= 10 || human.gameboard.board[r][c]) {
          fits = false;
          break;
        }
      }
      if (fits) {
        human.gameboard.placeShip(ship, row, col, horizontal);
        placed = true;
      }
    }
  });

  currentShipIndex = shipSizes.length;
  startGame();
};

document.getElementById('random-place-btn').addEventListener('click', placeHumanShipsRandomly);


const updateShipInfo = () => {
  document.getElementById('ship-name').textContent = shipSizes[currentShipIndex].name;
  document.getElementById('ship-length').textContent = shipSizes[currentShipIndex].length;
};

document.getElementById('toggle-direction').addEventListener('click', () => {
  isHorizontal = !isHorizontal;
  document.getElementById('toggle-direction').textContent =
    `Dirección: ${isHorizontal ? 'Horizontal' : 'Vertical'}`;
});

// --- JUEGO ---

const placeCpuShips = () => {
  shipSizes.forEach(({ length }) => {
    const ship = new Ship(length);
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const horizontal = Math.random() > 0.5;
      try {
        let fits = true;
        for (let i = 0; i < length; i++) {
          const r = horizontal ? row : row + i;
          const c = horizontal ? col + i : col;
          if (r >= 10 || c >= 10 || cpu.gameboard.board[r][c]) {
            fits = false;
            break;
          }
        }
        if (fits) {
          cpu.gameboard.placeShip(ship, row, col, horizontal);
          placed = true;
        }
      } catch {
        // intenta de nuevo
      }
    }
  });
};

const startGame = () => {
  placeCpuShips();
  document.getElementById('setup').style.display = 'none';
  document.getElementById('game').style.display = 'flex';
  document.getElementById('restart-btn').style.display = 'block';
  render();
  document.getElementById('enemy-board').addEventListener('click', handleAttack);
};

const render = () => {
  renderBoard(human.gameboard, 'player-board', false);
  renderBoard(cpu.gameboard, 'enemy-board', true);
  updateShipsLeft();
};

const handleAttack = (e) => {
  if (gameOver) return;
  if (!e.target.classList.contains('cell')) return;

  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);

  const alreadyAttacked = human.attackedCells
    .some(([r, c]) => r === row && c === col);
  if (alreadyAttacked) return;

  human.attack(cpu.gameboard, row, col);
  render();

  if (cpu.gameboard.allSunk()) {
    showMessage('¡Ganaste! 🎉');
    gameOver = true;
    return;
  }

  setTimeout(() => {
    cpu.randomAttack(human.gameboard);
    render();

    if (human.gameboard.allSunk()) {
      showMessage('¡Perdiste! 💀');
      gameOver = true;
    }
  }, 500);
};

document.getElementById('restart-btn').addEventListener('click', () => {
  location.reload();
});


const updateShipsLeft = () => {
  const playerLeft = human.gameboard.ships.filter(s => !s.isSunk()).length;
  const enemyLeft = cpu.gameboard.ships.filter(s => !s.isSunk()).length;
  document.getElementById('player-ships-left').textContent = playerLeft;
  document.getElementById('enemy-ships-left').textContent = enemyLeft;
};


// Iniciar setup
updateShipInfo();
renderSetupBoard();