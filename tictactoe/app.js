// Módulo Gameboard
const Gameboard = (() => {
  // Inicializa el tablero como un array de 9 elementos, todos nulos
  const board = Array(9).fill(null);

  // Función para reiniciar el tablero
  const resetBoard = () => {
      board.fill(null);
  };

  // Función para colocar una marca en el tablero
  const placeMark = (index, mark) => {
      if (!board[index]) { // Verifica si la celda está vacía
          board[index] = mark; // Coloca la marca ('X' o 'O')
          return true; // Retorna verdadero si se pudo colocar la marca
      }
      return false; // Retorna falso si la celda ya está ocupada
  };

  // Función para verificar si hay un ganador
  const checkWinner = () => {
      const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
          [0, 4, 8], [2, 4, 6]             // diagonales
      ];

      // Recorre los patrones de victoria
      for (const pattern of winPatterns) {
          const [a, b, c] = pattern; // Desestructura el patrón
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
              return board[a]; // Retorna el ganador ('X' o 'O')
          }
      }
      
      // Verifica si hay un empate
      return board.includes(null) ? null : 'Tie'; // Retorna 'Tie' si no hay más espacios
  };

  // Retorna las funciones y el estado del tablero
  return {
      board,
      resetBoard,
      placeMark,
      checkWinner
  };
})();

// Factory para crear jugadores
const Player = (name, mark) => {
  return { name, mark }; // Retorna un objeto con el nombre y la marca del jugador
};

// Módulo DisplayController
const DisplayController = (() => {
  const gameboardElement = document.getElementById('gameboard'); // Elemento del tablero en el DOM
  const resultElement = document.getElementById('result'); // Elemento para mostrar el resultado
  let currentPlayer; // Jugador actual
  let player1, player2; // Jugadores

  // Función para crear el tablero en el DOM
  const createBoard = () => {
      gameboardElement.innerHTML = ''; // Limpia el contenido del tablero
      Gameboard.board.forEach((cell, index) => {
          const cellElement = document.createElement('div'); // Crea un nuevo div para cada celda
          cellElement.classList.add('cell'); // Añade la clase 'cell'
          cellElement.dataset.index = index; // Guarda el índice en un atributo de datos
          cellElement.textContent = cell; // Muestra el contenido de la celda
          cellElement.addEventListener('click', () => handleCellClick(index)); // Añade un evento de clic
          gameboardElement.appendChild(cellElement); // Añade la celda al tablero
      });
  };

  // Función para manejar el clic en una celda
  const handleCellClick = (index) => {
      if (Gameboard.placeMark(index, currentPlayer.mark)) { // Intenta colocar la marca
          const winner = Gameboard.checkWinner(); // Verifica si hay un ganador
          createBoard(); // Actualiza el tablero
          if (winner) {
              displayResult(winner); // Muestra el resultado si hay un ganador
          } else {
              switchPlayer(); // Cambia al siguiente jugador
          }
      }
  };

  // Función para cambiar de jugador
  const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1; // Alterna entre los jugadores
  };

  // Función para mostrar el resultado del juego
  const displayResult = (winner) => {
      if (winner === 'Tie') {
          resultElement.textContent = "¡Es un empate!"; // Muestra mensaje de empate
      } else {
          resultElement.textContent = `${winner} ¡gana!`; // Muestra quién ganó
      }
  };

  // Función para iniciar el juego
  const startGame = () => {
    const player1Name = document.getElementById('player1').value; // Obtiene el nombre del jugador 1
    const player2Name = document.getElementById('player2').value; // Obtiene el nombre del jugador 2

    // Verifica que ambos jugadores tengan nombres
    if (player1Name && player2Name) {
        player1 = Player(player1Name, 'X'); // Crea el jugador 1 con la marca 'X'
        player2 = Player(player2Name, 'O'); // Crea el jugador 2 con la marca 'O'
        currentPlayer = player1; // Establece al jugador 1 como el jugador actual
        Gameboard.resetBoard(); // Reinicia el tablero
        createBoard(); // Crea el tablero en el DOM
        resultElement.textContent = ''; // Limpia el mensaje de resultado
    } else {
        alert("Por favor, ingresa nombres para ambos jugadores."); // Alerta si falta un nombre
    }
};

// Añade un evento al botón de inicio del juego
document.getElementById('startGame').addEventListener('click', startGame);

// Retorna las funciones que se pueden usar fuera del módulo
return {
    createBoard,
    startGame
};
})();

// Inicializa el tablero al cargar la página
DisplayController.createBoard();