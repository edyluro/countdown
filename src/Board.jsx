import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PieceContainer from "./PieceContainer";

const CenteredDiv = styled.div`
	text-align: center;
`;

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		const { wordLength } = this.props;
		this.state = {
			letters: {
				available: [],
				guessed: null,
				characters: wordLength,
			},
		};
	}

	componentDidMount() {
		this.fillBoard();
	}

	fillBoard = () => {
		const { wordToGuess } = this.props;
		const shuffledWord = this.shuffleWord(wordToGuess);
		this.setState((prevState) => ({
			letters: {
				...prevState.letters,
				available: shuffledWord,
			},
		}));
	};

	shuffleWord = (word) => {
		const newWord = `${word}JXQZ`;
		const wordArray = newWord.split("");
		return this.shuffleArray(wordArray);
	};

	shuffleArray = (array) => {
		const a = array.slice();
		for (let i = a.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	};

	renderWord = (characters) => {
		const word = [];
		for (let i = 0; i < characters; i += 1) {
			word.push(
				<PieceContainer
					onPutHandler={this.onPutHandler}
					letter={null}
					isGuessed
				/>
			);
		}
		return word;
	};

	onPutHandler = (event) => {
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

Board.propTypes = {
	wordToGuess: PropTypes.string.isRequired,
	wordLength: PropTypes.number.isRequired,
};
