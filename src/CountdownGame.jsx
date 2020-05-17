import React from "react";
import styled from "styled-components";

import Board from "./Board";
import Timer from "./Timer";
import * as Constants from "./constants";
import fail from "./assets/fail.png";
import success from "./assets/success.png";

const CenteredDiv = styled.div`
	text-align: center;
`;

const H2 = styled.h2`
	font-family: sans-serif;
	font-weight: 300;
	color: ${(props) => props.theme.primary};
	text-align: center;
`;

const H4 = styled.h4`
	font-family: sans-serif;
	font-weight: 300;
	color: ${(props) => props.theme.primary};
	text-align: center;
`;

const Img = styled.img`
	margin: 20px 5px;
	width: 50px;
	height: 50px;
`;

const TryAgainH2 = styled.h2`
	font-family: sans-serif;
	font-weight: 300;
	color: ${(props) => props.theme.secondary};
	text-align: center;
	cursor: pointer;
`;

const { DICTIONARY, GAME_STATUS, WORD_LENGTH } = Constants;

export default class CountdownGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			word: null,
			status: null,
			tries: 0,
		};
	}

	componentDidMount() {
		this.initializeGame();
	}

	initializeGame = () => {
		const randomIndex = Math.floor(Math.random() * DICTIONARY.length);
		const wordToGuess = DICTIONARY[randomIndex];
		this.setState({ word: wordToGuess, status: GAME_STATUS.START, tries: 0 });
	};

	startGame = () => {
		this.setGameStatus(GAME_STATUS.PROGRESS);
	};

	setGameStatus = (status) => {
		this.setState({ status });
	};

	/* Verifies and updates the status of the game each time a letter is placed. */
	verifyGuessedWord = (guess) => {
		const { word, status, tries } = this.state;
		/* If there are no more empty fields and there is a game in progress
		 * verify, otherwise it stops the verification. */
		if (guess.length === WORD_LENGTH && status === GAME_STATUS.PROGRESS) {
			/* If the word guessed is the same as the answer, otherwise increase the tries by one. */
			if (guess === word) {
				this.setGameStatus(GAME_STATUS.WON);
			} else {
				const newTry = tries + 1;
				if (newTry >= Constants.MAXIMUM_TRIES) {
					this.setGameStatus(GAME_STATUS.LOST);
				} else {
					this.setGameStatus(GAME_STATUS.FAILED);
				}
				this.setState({ tries: newTry });
			}
		}
	};

	timeUpHandler = () => {
		this.setState({ tries: 1, status: GAME_STATUS.LOST });
	};

	render() {
		const { word, status, tries } = this.state;
		let renderBoard;
		if (word) {
			renderBoard = (
				<Board
					wordToGuess={word}
					wordLength={WORD_LENGTH}
					gameStatus={status}
					startGameHandler={this.startGame}
					verifyGuessedWord={this.verifyGuessedWord}
				/>
			);
		} else {
			renderBoard = <div />;
		}

		const fails = [];

		for (let i = 0; i < tries; i += 1) {
			fails.push(<Img src={fail} alt="Fail" />);
		}

		let renderGameStatus;
		if (status === GAME_STATUS.WON) {
			renderGameStatus = (
				<CenteredDiv>
					<Img src={success} alt="Success" />
				</CenteredDiv>
			);
		}
		if (status === GAME_STATUS.LOST) {
			renderGameStatus = (
				<CenteredDiv>
					{fails}
					<TryAgainH2 onClick={this.initializeGame}>Try Again</TryAgainH2>
				</CenteredDiv>
			);
		}

		if (status === GAME_STATUS.PROGRESS) {
			renderGameStatus = <CenteredDiv>{fails}</CenteredDiv>;
		}

		return (
			<CenteredDiv>
				<Timer timeUpHandler={this.timeUpHandler} gameStatus={status} />
				<H2>Create the word by dragging letters into the empty boxes</H2>
				<H4>You have one minute</H4>
				{renderBoard}
				{renderGameStatus}
			</CenteredDiv>
		);
	}
}
