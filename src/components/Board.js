import React from "react";
import {Square} from "./Square";
import {calculateWinner} from "../functions/calculateWinner";

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            nextPlayer: "X"
        };
    }

    _getNextPlayer() {
        return this.state.nextPlayer === "X" ? "O" : "X";
    }

    _handleClick(index) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[index]) return;
        squares[index] = this.state.nextPlayer;
        this.setState({
            squares: squares,
            nextPlayer: this._getNextPlayer()
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this._handleClick(i)}
            />
        );
    }

    render() {
        const player = calculateWinner(this.state.squares);
        const status = player ? `Player ${player} won` : `Next player: ${this.state.nextPlayer}`;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}