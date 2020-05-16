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
            nextPlayer: "X",
            sort: "asc"
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
            nextPlayer: this._getNextPlayer(),
            sort: this.state.sort
        });
    }

    _jumpTo(step) {
        this.setState({
           stepNumber: step,
           nextPlayer: ((step % 2) === 0) ? "X" : "O"
        });
    }

    _getMoves(history) {
        history = history.slice();
        const moves = history.map((step, move, history) => {
            const pos = this._getPosition(move, history);
            const player = ((move % 2) === 0) ? "O" : "X";
            const desc = move
                ? 'Go to move #' + move  + ' (' + player + ' ' + pos + ')'
                : 'Go to game start';
            return (
                <li key={move}><button onClick={() => this._jumpTo(move)}>{desc}</button></li>
            );
        });
        if (this.state.sort === "desc") moves.reverse();
        return moves;
    }

    _getPosition(move, history) {
        if (! move) return null;
        const current = history[move].squares;
        const previous = history[move - 1].squares;
        const step = this._getStep(current, previous);
        return this._getCoordinates(step);
    }

    _getStep(current, previous) {
        for (let i = 0; i < current.length; i++) {
            if (current[i] !== previous[i]) return i;
        }
        return null;
    }

    _getCoordinates(index) {
        const coordinates = ["1:1", "1:2", "1:3", "2:1", "2:2", "2:3", "3:1", "3:2", "3:3"];
        return coordinates[index];
    }

    _sort() {
        const state = Object.assign({}, this.state);
        const sort = this.state.sort;
        state.sort = (sort === "asc") ? "desc" : "asc";
        this.setState(state);
    }

    _getStatus(winner, squares) {
        return winner
            ? `Player ${winner} won`
            : this._isThereEmptySquare(squares)
                ? `Next player: ${this.state.nextPlayer}`
                : `Drawn game`;
    }

    _isThereEmptySquare(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (! squares[i]) return true;
        }
        return false;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        const moves = this._getMoves(history);

        const status = this._getStatus(winner, squares);
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
                    <button onClick={() => this._sort()}>Sort "{this.state.sort}"</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}