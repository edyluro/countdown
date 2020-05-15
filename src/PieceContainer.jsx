import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import LetterPiece from "./LetterPiece";

const ContainerDiv = styled.div`
	margin: 10px;
	border-color: ${(props) => props.theme.primary};
	border-style: solid;
	color: #333;
	display: inline-block;
	text-align: center;
	min-height: 60px;
	min-width: 50px;
`;

const onDragOver = (event) => {
	event.preventDefault();
};

const onDragStartHandler = (event, { letter, isDraggable, isGuessed }) => {
	const pieceString = JSON.stringify({ letter, isDraggable, isGuessed });
	event.dataTransfer.setData("text/plain", pieceString);
};

export default function PieceContainer({ letter, isGuessed, onPutHandler }) {
	const onDropHandler = (event) => {
		const piece = JSON.parse(event.dataTransfer.getData("text"));
		console.log(piece);
		if (isGuessed) {
			onPutHandler(event);
		}
	};

	return (
		<ContainerDiv
			onDragOver={(event) => onDragOver(event)}
			onDrop={(event) => onDropHandler(event, letter, isGuessed)}
		>
			<LetterPiece
				letter={letter}
				isDraggable={!isGuessed}
				isGuessed={isGuessed}
				isDisabled={isGuessed}
				onDragStartHandler={onDragStartHandler}
			/>
		</ContainerDiv>
	);
}

PieceContainer.propTypes = {
	letter: PropTypes.string,
	isGuessed: PropTypes.bool,
	onPutHandler: PropTypes.func,
};

PieceContainer.defaultProps = {
	letter: null,
	isGuessed: false,
	onPutHandler: null,
};
