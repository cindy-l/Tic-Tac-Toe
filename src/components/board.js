import React, { Component } from "react";
import "./board.css";

function Square(props) {
  return (
    <button
      className="square"
      value={props.value}
      style={{ color: props.value === "X" ? "black" : "blue" }}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const squares = this.props.squares.map((_, i) =>
      i % 3 === 0 ? (
        <div className="boardRow" key={i}>
          {this.renderSquare(i)}
          {this.renderSquare(i + 1)}
          {this.renderSquare(i + 2)}
        </div>
      ) : null
    );

    return <div className="board">{squares}</div>;
  }
}

export default Board;
