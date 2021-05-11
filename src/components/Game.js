import React from "react";
import Board from "./Board.js";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNum:0,
      xIsNext: true,
    };
  }

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNum+1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (this.calcWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNum: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  calcWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return false;
  };

  jumpTo = (step) => {
      this.setState({stepNum: step, xIsNext:(step%2) === 0})
  }

  reset = () => {
      this.setState({
        history: [{ squares: Array(9).fill(null) }],
        xIsNext: true,
      });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNum];
    const winner = this.calcWinner(current.squares);

    const moves = history.map((step,move) => {
        const desc = move ? `Go to move ${move}`:
        'Got to game start';
        return (
            <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>
        );
    });

    let status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? "X" : "O"}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          <button onClick={() => this.reset()}>reset game</button>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{moves}</div>
        </div>
      </div>
    );
  }
}

export default Game;
