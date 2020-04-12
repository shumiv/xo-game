import React from "react";
import {Square} from "./Square";

export class Board extends React.Component {

    _renderSquare(i) {
        return (
            <Square
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
                row.push(this._renderSquare(index++));
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