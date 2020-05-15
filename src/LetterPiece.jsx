import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LetterDiv = styled.div`
	color: ${(props) => props.theme.secondary};
	display: inline-block;
	font-family: monospace;
	font-size: 50px;
	text-align: center;
	min-height: 60px;
	min-width: 50px;
`;

const onDragStart = (event, piece) => {
	const pieceString = JSON.stringify(piece);
	event.dataTransfer.setData("text/plain", pieceString);
};

export default function LetterPiece({ letter, isDraggable, isGuessed }) {
	return (
		<LetterDiv
			onDragStart={(event) =>
				onDragStart(event, { letter, isDraggable, isGuessed })
			}
			draggable={isDraggable}
		>
			{letter}
		</LetterDiv>
	);
}

LetterPiece.propTypes = {
	letter: PropTypes.string.isRequired,
	isDraggable: PropTypes.bool,
	isGuessed: PropTypes.bool,
};

LetterPiece.defaultProps = {
	isDraggable: true,
	isGuessed: false,
};
