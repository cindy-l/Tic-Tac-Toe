import React, { Component } from "react";
import Board from "./board";
import Score from "./score";
import "./game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      XTurn: true,
      isEndGame: false,
      xwins: 0,
      owins: 0
    };
  }

  handleClick(i) {
    //returns if the square is already filled or if a winner has been found
    if (this.state.squares[i] || this.state.isEndGame) {
      return;
    }
    let squares = this.state.squares.slice();
    squares[i] = this.state.XTurn ? "X" : "O";

    this.setState(
      {
        squares: squares,
        XTurn: !this.state.XTurn
      },
      () => {
        const winner = this.getWinner(squares);
        if (winner) {
          this.setState({ isEndGame: true });
          if (winner === "X WIN!")
            this.setState(state => ({ xwins: state.xwins + 1 }));
          else if (winner === "O WIN!")
            this.setState(state => ({ owins: state.owins + 1 }));
        }
      }
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

  handlePlayAgain = () => {
    this.setState({
      squares: Array(9).fill(null),
      XTurn: true,
      isEndGame: false
    });
  };

  render() {
    const winner = this.getWinner(this.state.squares);
    let status = "";

    if (winner) {
      status = winner;
    } else {
      status = this.state.XTurn ? "Player: X" : "Player: O";
    }

    const playAgain = (
      <button className="btn btn-success" onClick={this.handlePlayAgain}>
        Play again
      </button>
    );

    return (
      <div className="container">
        <p className="status">{status}</p>
        <Board
          squares={this.state.squares}
          onClick={i => this.handleClick(i)}
        />
        <Score xwins={this.state.xwins} owins={this.state.owins} />
        {winner && playAgain}
      </div>
    );
  }
}

export default Game;
