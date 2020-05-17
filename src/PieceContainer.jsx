import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import LetterPiece from "./LetterPiece";
import { CONTAINER_FRAME_TYPE, CONTAINER_TYPE } from "./constants";

const ContainerDiv = styled.div`
	margin: 10px;
	border-color: ${(props) => {
		if (props.type === CONTAINER_FRAME_TYPE.SUCCESS) {
			return props.theme.successFrame;
		}
		if (props.type === CONTAINER_FRAME_TYPE.DANGER) {
			return props.theme.dangerFrame;
		}
		return props.theme.primaryFrame;
	}};
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

export default function PieceContainer({
	id,
	letter,
	frameType,
	type,
	disableLetter,
	onGuessHandler,
}) {
	const onDragStartHandler = (event) => {
		if (disableLetter) {
			event.preventDefault();
		} else {
			const pieceString = JSON.stringify({ id, type });
			event.dataTransfer.setData("text/plain", pieceString);
		}
	};

	const onDropHandler = (event) => {
		const draggedPiece = JSON.parse(event.dataTransfer.getData("text"));
		if (type === CONTAINER_TYPE.GUESSED) {
			const guessObject = { from: draggedPiece, to: { id, type } };
			onGuessHandler(guessObject);
		}
	};

	return (
		<ContainerDiv
			onDragOver={(event) => onDragOver(event)}
			onDrop={(event) => onDropHandler(event)}
			type={frameType}
		>
			<LetterPiece
				letter={letter}
				isDraggable={type === CONTAINER_TYPE.AVAILABLE}
				isDisabled={disableLetter}
				type={type}
				onDragStartHandler={onDragStartHandler}
			/>
		</ContainerDiv>
	);
}

PieceContainer.propTypes = {
	id: PropTypes.string.isRequired,
	letter: PropTypes.string,
	frameType: PropTypes.string,
	type: PropTypes.string.isRequired,
	disableLetter: PropTypes.bool,
	onGuessHandler: PropTypes.func,
};

PieceContainer.defaultProps = {
	letter: null,
	frameType: CONTAINER_FRAME_TYPE.PRIMARY,
	onGuessHandler: null,
	disableLetter: false,
};
