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
            stepNumber: 0,
            nextPlayer: "X"
        }
    }

    _getNextPlayer() {
        return this.state.nextPlayer === "X" ? "O" : "X";
    }

    _handleClick(index) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[index]) return;
        squares[index] = this.state.nextPlayer;
        this.setState({
            history: history.concat([{squares: squares}]),
            stepNumber: history.length,
            nextPlayer: this._getNextPlayer()
        });
    }

    _jumpTo(step) {
        this.setState({
           stepNumber: step,
           nextPlayer: ((step % 2) === 0) ? "X" : "O"
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);

        const moves = history.map((step, move) => {
           const desc = move
               ? 'Go to move #' + move
               : 'Go to game start';
           return (
               <li key={move}><button onClick={() => this._jumpTo(move)}>{desc}</button></li>
           );
        });

        const status = winner ? `Player ${winner} won` : `Next player: ${this.state.nextPlayer}`;
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
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}