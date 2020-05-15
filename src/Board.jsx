import React from "react";
import styled from "styled-components";
import LetterPiece from "./LetterPiece";
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
				guessed: Array(5).fill(null),
			},
		};
	}

	render() {
		const { letters } = this.state;
		const { available, guessed } = letters;
		return (
			<div>
				<CenteredDiv>
					{available.map((letter) => {
						return (
							<PieceContainer>
								<LetterPiece letter={letter}>A</LetterPiece>
							</PieceContainer>
						);
					})}
				</CenteredDiv>
				<CenteredDiv>
					{guessed.map((letter) => {
						let piece;
						if (letter) {
							piece = <LetterPiece letter={letter}>A</LetterPiece>;
						}
						return <PieceContainer>{piece}</PieceContainer>;
					})}
				</CenteredDiv>
			</div>
		);
	}
}
