import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PieceContainer from "./PieceContainer";
import { CONTAINER_TYPE, GAME_STATUS } from "./constants";

const CenteredDiv = styled.div`
	text-align: center;
`;

function shuffleArray(array) {
	const a = array.slice();
	for (let i = a.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function shuffleWord(word) {
	const newWord = `${word}JXQZ`;
	const wordArray = newWord.split("");
	return shuffleArray(wordArray);
}

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			letters: {
				available: [],
				guessed: [],
			},
		};
	}

	componentDidMount() {
		this.fillBoard();
	}

	componentDidUpdate = () => {
		const { gameStatus } = this.props;
		if (gameStatus === GAME_STATUS.START) {
			this.fillBoard();
		} else if (gameStatus === GAME_STATUS.FAILED) {
			this.resetGuess();
		}
	};

	resetGuess = () => {
		const { startGameHandler } = this.props;
		const { letters: { available, guessed } = {} } = this.state;
		const newAvailableArray = available.map((piece) => {
			return { ...piece, disableLetter: false };
		});
		const newGuessedArray = guessed.map((piece) => {
			return {
				...piece,
				letter: null,
				parentId: null,
				disableLetter: true,
			};
		});
		this.setState(
			(prevState) => ({
				letters: {
					...prevState.letters,
					available: newAvailableArray,
					guessed: newGuessedArray,
				},
			}),
			startGameHandler
		);
	};

	fillBoard = () => {
		const { wordToGuess, wordLength, startGameHandler } = this.props;
		const letterArray = shuffleWord(wordToGuess);
		const availableArray = this.createAvailableArray(letterArray);
		const guessedArray = this.createGuessedArray(wordLength);
		this.setState(
			(prevState) => ({
				letters: {
					...prevState.letters,
					available: availableArray,
					guessed: guessedArray,
				},
			}),
			startGameHandler
		);
	};

	makeGuess = () => {
		const { verifyGuessedWord } = this.props;
		const { letters: { guessed } = {} } = this.state;
		let guessedWord = "";
		guessed.forEach(({ letter }) => {
			guessedWord += letter;
		});
		verifyGuessedWord(guessedWord);
	};

	createAvailableArray = (letterArray) => {
		const availableArray = [];
		letterArray.forEach((letter, index) => {
			const uniqueKey = `${CONTAINER_TYPE.AVAILABLE}-${index}-${letter}`;
			availableArray.push({
				key: uniqueKey,
				id: uniqueKey,
				letterParentId: uniqueKey,
				letter,
				type: CONTAINER_TYPE.AVAILABLE,
				disableLetter: false,
			});
		});
		return availableArray;
	};

	createGuessedArray = (arrayLength) => {
		const guessedArray = [];
		for (let i = 0; i < arrayLength; i += 1) {
			const uniqueKey = `${CONTAINER_TYPE.GUESSED}-${i}`;
			guessedArray.push({
				key: uniqueKey,
				id: uniqueKey,
				letterParentId: null,
				letter: null,
				type: CONTAINER_TYPE.GUESSED,
				disableLetter: true,
			});
		}
		return guessedArray;
	};

	getPieceFromId = ({ id, type }) => {
		const { letters: { available, guessed } = {} } = this.state;
		let piece;
		if (type === CONTAINER_TYPE.GUESSED) {
			piece = guessed.find((letter) => letter.id === id);
		} else {
			piece = available.find((letter) => letter.id === id);
		}
		return piece;
	};

	changeStateFromGuess = (pieceFrom, pieceTo) => {
		if (pieceTo.letter === null) {
			const { letters: { available, guessed } = {} } = this.state;
			if (pieceFrom.type === CONTAINER_TYPE.AVAILABLE) {
				const newAvailableArray = available.map((piece) => {
					if (piece.id === pieceFrom.id) {
						return { ...piece, disableLetter: true };
					}
					return piece;
				});
				const newGuessedArray = guessed.map((piece) => {
					if (piece.id === pieceTo.id) {
						return {
							...piece,
							letter: pieceFrom.letter,
							parentId: pieceFrom.parentId,
							disableLetter: false,
						};
					}
					return piece;
				});
				this.setState(
					(prevState) => ({
						letters: {
							...prevState.letters,
							available: newAvailableArray,
							guessed: newGuessedArray,
						},
					}),
					this.makeGuess
				);
			} else {
				const newGuessedArray = guessed.map((piece) => {
					if (piece.id === pieceFrom.id) {
						return {
							...piece,
							letter: null,
							parentId: null,
							disableLetter: true,
						};
					}
					if (piece.id === pieceTo.id) {
						return {
							...piece,
							letter: pieceFrom.letter,
							parentId: pieceFrom.parentId,
							disableLetter: false,
						};
					}
					return piece;
				});
				this.setState((prevState) => ({
					letters: {
						...prevState.letters,
						guessed: newGuessedArray,
					},
				}));
			}
		}
	};

	onGuessHandler = ({ from, to }) => {
		const letterPieceFrom = this.getPieceFromId(from);
		const letterPieceTo = this.getPieceFromId(to);
		this.changeStateFromGuess(letterPieceFrom, letterPieceTo);
	};

	renderPieceContainer = (pieceProps) => {
		const { key, id, letter, type, disableLetter } = pieceProps;
		return (
			<PieceContainer
				key={key}
				id={id}
				onGuessHandler={this.onGuessHandler}
				letter={letter}
				type={type}
				disableLetter={disableLetter}
			/>
		);
	};

	render() {
		const { letters } = this.state;
		const { available, guessed } = letters;
		return (
			<div>
				<CenteredDiv>
					{available.map((pieceProps) => {
						return this.renderPieceContainer(pieceProps);
					})}
				</CenteredDiv>
				<CenteredDiv>
					{guessed.map((pieceProps) => {
						return this.renderPieceContainer(pieceProps);
					})}
				</CenteredDiv>
			</div>
		);
	}
}

Board.propTypes = {
	gameStatus: PropTypes.string.isRequired,
	wordToGuess: PropTypes.string.isRequired,
	wordLength: PropTypes.number.isRequired,
	verifyGuessedWord: PropTypes.func.isRequired,
	startGameHandler: PropTypes.func.isRequired,
};
