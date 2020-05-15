import React from "react";
import styled from "styled-components";
import PieceContainer from "./PieceContainer";

const CenteredDiv = styled.div`
	text-align: center;
`;

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			letters: {
				available: ["W", "Y", "D", "E", "I", "L", "W", "H", "E"],
				characters: 5,
			},
		};
	}

	renderWord = (characters) => {
		const word = [];
		for (let i = 0; i < characters; i += 1) {
			word.push(
				<PieceContainer
					onPutHandler={this.onDropHandler}
					letter={null}
					isGuessed
				/>
			);
		}
		return word;
	};

	onDropHandler = (event) => {
		const piece = JSON.parse(event.dataTransfer.getData("text"));
		console.log(piece);
	};

	render() {
		const { letters } = this.state;
		const { available, characters } = letters;
		return (
			<div>
				<CenteredDiv>
					{available.map((letter) => {
						return <PieceContainer letter={letter} isGuessed={false} />;
					})}
				</CenteredDiv>
				<CenteredDiv>{this.renderWord(characters)}</CenteredDiv>
			</div>
		);
	}
}
