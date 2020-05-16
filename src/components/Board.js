import React from "react";
import {Square} from "./Square";

export class Board extends React.Component {

    _renderSquare(i, isWinnerSquare = false) {
        return (
            <Square
                isWinnerSquare={isWinnerSquare}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    _renderBoard(width, height) {
        const board = [];
        for (let i = 0, index = 0; i < width; i++) {
            const row = [];
            for (let j = 0; j < height; j++) {
                const isWinnerSquare = this.props.winnerSquares
                    ? this.props.winnerSquares.includes(index)
                    : false;
                row.push(this._renderSquare(index++, isWinnerSquare));
            }
            board.push(<div className="board-row">{row}</div>);
        }
        return board;
    }

    render() {
        const board = this._renderBoard(3, 3);
        return <div>{board}</div>;
    }
}