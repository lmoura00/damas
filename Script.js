const board = document.getElementById("game-board");
const size = 8;
let selectedPiece = null;
let currentPlayer = 'red'; // 'red' começa

const initialBoard = [
  [null, 'red', null, 'red', null, 'red', null, 'red'],
  ['red', null, 'red', null, 'red', null, 'red', null],
  [null, 'red', null, 'red', null, 'red', null, 'red'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['blue', null, 'blue', null, 'blue', null, 'blue', null],
  [null, 'blue', null, 'blue', null, 'blue', null, 'blue'],
  ['blue', null, 'blue', null, 'blue', null, 'blue', null]
];

// Função para criar o tabuleiro
function createBoard() {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      if ((row + col) % 2 === 0) {
        square.classList.add("white");
      } else {
        square.classList.add("black");
        if (initialBoard[row][col]) {
          const piece = document.createElement("div");
          piece.classList.add("piece", initialBoard[row][col]);
          piece.dataset.row = row;
          piece.dataset.col = col;
          square.appendChild(piece);
          piece.addEventListener('click', selectPiece);
        }
      }
      square.dataset.row = row;
      square.dataset.col = col;
      square.addEventListener('click', movePiece);
      board.appendChild(square);
    }
  }
}

// Função para selecionar uma peça
function selectPiece(event) {
  if (event.target.classList.contains(currentPlayer)) {
    if (selectedPiece) {
      selectedPiece.classList.remove('selected');
    }
    selectedPiece = event.target;
    selectedPiece.classList.add('selected');
  }
}

// Função para mover uma peça
function movePiece(event) {
  if (selectedPiece) {
    const targetSquare = event.target;
    const targetRow = targetSquare.dataset.row;
    const targetCol = targetSquare.dataset.col;
    const pieceRow = selectedPiece.dataset.row;
    const pieceCol = selectedPiece.dataset.col;

    // Validação de movimento simples
    if (Math.abs(pieceRow - targetRow) === 1 && Math.abs(pieceCol - targetCol) === 1 && !targetSquare.firstChild) {
      moveSelectedPiece(targetSquare);
    }
    // Captura de peça
    else if (Math.abs(pieceRow - targetRow) === 2 && Math.abs(pieceCol - targetCol) === 2) {
      const middleRow = (parseInt(pieceRow) + parseInt(targetRow)) / 2;
      const middleCol = (parseInt(pieceCol) + parseInt(targetCol)) / 2;
      const middleSquare = document.querySelector(`[data-row="${middleRow}"][data-col="${middleCol}"]`);
      if (middleSquare.firstChild && !targetSquare.firstChild && !middleSquare.firstChild.classList.contains(currentPlayer)) {
        middleSquare.removeChild(middleSquare.firstChild);
        moveSelectedPiece(targetSquare);
      }
    }
  }
}

// Função para mover a peça selecionada
function moveSelectedPiece(targetSquare) {
  targetSquare.appendChild(selectedPiece);
  selectedPiece.classList.remove('selected');
  selectedPiece.dataset.row = targetSquare.dataset.row;
  selectedPiece.dataset.col = targetSquare.dataset.col;
  selectedPiece = null;
  switchPlayer();
}

// Alterna o jogador atual
function switchPlayer() {
  currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
}

// Cria o tabuleiro ao carregar a página
createBoard();
