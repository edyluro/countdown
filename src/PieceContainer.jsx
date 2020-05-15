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
			<LetterPiece letter={letter} isDraggable={!isGuessed} isGuessed />
		</ContainerDiv>
	);
}

PieceContainer.propTypes = {
	letter: PropTypes.string.isRequired,
	isGuessed: PropTypes.bool,
	onPutHandler: PropTypes.func,
};

PieceContainer.defaultProps = {
	isGuessed: false,
	onPutHandler: null,
};
