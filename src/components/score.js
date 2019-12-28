import React, { Component } from "react";
import "./score.css";

class Score extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>X</th>
            <th>O</th>
          </tr>
          <tr>
            <td>{this.props.xwins}</td>
            <td>{this.props.owins}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Score;
