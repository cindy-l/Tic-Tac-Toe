import React, { Component } from "react";
import "./board.css";

function Square(props) {
  return (
    <button
      className="square"
      value={props.value}
      style={{ color: props.value == "X" ? "black" : "blue" }}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      XTurn: true
    };
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    //returns if the square is already filled or if a winner has been found
    if (this.state.squares[i] || this.getWinner(this.state.squares)) {
      return;
    }
    let squares = this.state.squares.slice();
    squares[i] = this.state.XTurn ? "X" : "O";

    this.setState({
      squares: squares,
      XTurn: !this.state.XTurn
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  getWinner(squares) {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];
    for (let i = 0; i < wins.length; i++) {
      const [a, b, c] = wins[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a] + " WIN!";
      }
    }
    //return null if the board is not completely filled, return It's a draw otherwise
    const emptyBoxes = squares.filter(_ => _ === null);
    if (emptyBoxes.length > 0) return null;
    return "It's a draw";
  }

  handlePlayAgain() {
    const squares = Array(9).fill(null);
    this.setState({
      squares: squares,
      XTurn: true
    });
  }

  render() {
    const winner = this.getWinner(this.state.squares);
    let status = "";
    if (winner) {
      status = (
        <div>
          <p>{winner}</p>
        </div>
      );
    } else {
      status = this.state.XTurn ? <p>Player: X</p> : <p>Player: O</p>;
    }
    const playAgain = (
      <button
        className="btn btn-success playAgain"
        onClick={this.handlePlayAgain}
      >
        Play again
      </button>
    );
    const squares = this.state.squares.map((_, i) =>
      i % 3 == 0 ? (
        <div className="boardRow" key={i}>
          {this.renderSquare(i)}
          {this.renderSquare(i + 1)}
          {this.renderSquare(i + 2)}
        </div>
      ) : null
    );

    return (
      <div>
        <div className="status">{status}</div>
        {squares}
        {winner && playAgain}
      </div>
    );
  }
}

export default Board;
