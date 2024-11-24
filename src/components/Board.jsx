import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Board.scss';

function Square({ value, onSquareClick, className }) {
   return (
      <button className={'square ' + className} onClick={onSquareClick}>
         {value}
      </button>
   );
}
Square.propTypes = {
   value: PropTypes.string,
   onSquareClick: PropTypes.func.isRequired,
   className: PropTypes.string
};

function Board({ xIsNext, squares, onPlay }) {
   const winner = calculateWinner(squares);
   let status;
   switch (winner.status) {
      case 'winner':
         status = winner.player + ' a gagné';
         break;
      case 'gameInProgress':
         status = 'Prochain tour : ' + (xIsNext ? 'X' : 'O');
         break;
      case 'draw':
         status = 'Match nul';
         break;
      default:
         status = 'Unkonw game status';
   }

   useEffect(() => {
      document.title = status;
   }, [status]);

   function handleClick(line, col) {
      if (squares[line * 3 + col] || winner.status != 'gameInProgress') return;
      const nextSquares = squares.slice();
      nextSquares[line * 3 + col] = xIsNext ? 'X' : 'O';
      onPlay(nextSquares, line + 1, col + 1);
   }

   const boardDOM = [...Array(3)].map((_, line) => {
      const squareX3 = [...Array(3)].map((_, col) => {
         let className = '';
         if (winner.status === 'winner' && winner.line.includes(line * 3 + col))
            className = 'winCase';
         return (
            <Square
               className={className}
               key={line * 3 + col}
               value={squares[line * 3 + col]}
               onSquareClick={() => handleClick(line, col)}
            />
         );
      });

      return (
         <div className="board-row" key={line}>
            {squareX3}
         </div>
      );
   });

   return (
      <>
         <div className="status">{status}</div>
         {boardDOM}
      </>
   );
}
Board.propTypes = {
   xIsNext: PropTypes.bool.isRequired,
   squares: PropTypes.array.isRequired,
   onPlay: PropTypes.func.isRequired
};

function calculateWinner(squares) {
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ];

   for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
         return {
            status: 'winner',
            player: squares[a],
            line: [a, b, c]
         };
      }
   }

   if (squares.filter((square) => square === null).length === 0) {
      return { status: 'draw' };
   }

   return {
      status: 'gameInProgress'
   };
}

export default function Game() {
   const [history, setHistory] = useState([{ board: Array(9).fill(null), move: [null, null] }]);
   const [currentMove, setCurrentMove] = useState(0);
   const [historyAscSorted, setHistoryAscSorted] = useState(false);
   const xIsNext = currentMove % 2 === 0;
   let currentSquares = history[currentMove].board;

   function handlePlay(nextSquares, line, col) {
      const nextHistory = [
         ...history.slice(0, currentMove + 1),
         { board: nextSquares, move: [line, col] }
      ];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
   }

   function jumpTo(nextMove) {
      setCurrentMove(nextMove);
   }

   let sortedHistory = [...history];
   if (historyAscSorted) sortedHistory.reverse();

   const moves = sortedHistory.map((squares, move) => {
      move = !historyAscSorted ? move : history.length - 1 - move;
      let description =
         move > 0 ? `#${move + 1} : (${squares.move[0]};${squares.move[1]})` : 'Revenir au début';

      return currentMove === move ? (
         <li key={move}>Vous êtes au coup #{move + 1}</li>
      ) : (
         <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
         </li>
      );
   });

   return (
      <>
         <h1>Tic Tac Toe</h1>
         <div className="game">
            <div className="game-board">
               <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
               <ol>{moves}</ol>
               <button onClick={() => setHistoryAscSorted(!historyAscSorted)}>
                  Trier par ordre {historyAscSorted ? 'décroissant' : 'croissant'}
               </button>
            </div>
         </div>
      </>
   );
}
