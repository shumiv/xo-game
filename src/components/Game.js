import React from 'react';
import {Board} from'./Board';
import {calculateWinner} from "../functions/calculateWinner";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            nextPlayer: "X"
        }
    }

    _getNextPlayer() {
        return this.state.nextPlayer === "X" ? "O" : "X";
    }

    _handleClick(index) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[index]) return;
        squares[index] = this.state.nextPlayer;
        this.setState({
            history: history.concat([{squares: squares}]),
            nextPlayer: this._getNextPlayer()
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const player = calculateWinner(squares);
        const status = player ? `Player ${player} won` : `Next player: ${this.state.nextPlayer}`;
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this._handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}