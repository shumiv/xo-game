import React from "react";

export class Square extends React.Component {
    render() {
        const additionalClasses = this.props.isWinnerSquare ? "winner" : "";
        return (
            <button
                className={`square ${additionalClasses}`}
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        );
    }
}