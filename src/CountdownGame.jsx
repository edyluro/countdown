import React from "react";
import styled from "styled-components";

import Board from "./Board";
import * as Constants from "./constants";

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

const { DICTIONARY, GAME_STATUS, WORD_LENGTH } = Constants;

export default class CountdownGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			word: null,
			status: GAME_STATUS.PROGRESS,
		};
	}

	componentDidMount() {
		this.createWordToGuess();
	}

	createWordToGuess = () => {
		const randomIndex = Math.floor(Math.random() * DICTIONARY.length);
		const wordToGuess = DICTIONARY[randomIndex];
		this.setState({ word: wordToGuess });
	};

	changeGameStatus = (status) => {
		this.setState({ status });
	};

	render() {
		const { word, status } = this.state;
		let renderBoard;
		if (word) {
			renderBoard = <Board wordToGuess={word} wordLength={WORD_LENGTH} />;
		} else {
			renderBoard = <div />;
		}

		let renderGameStatus;
		if (status === GAME_STATUS.WON) {
			renderGameStatus = <div>Good</div>;
		}
		if (status === GAME_STATUS.LOST) {
			renderGameStatus = <div>X</div>;
		}

		return (
			<div>
				<H2>Create the word by dragging letters into the empty boxes</H2>
				<H4>You have one minute</H4>
				{renderBoard}
				{renderGameStatus}
			</div>
		);
	}
}
