import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LetterDiv = styled.div`
	color: ${(props) => props.theme.secondary};
	display: inline-block;
	font-family: monospace;
	font-size: 32px;
	text-align: center;
	min-height: 60px;
	min-width: 50px;
`;

const onDragStart = (event, letter) => {
	event.dataTransfer.setData("letter", letter);
};

export default function LetterPiece({ letter }) {
	return (
		<LetterDiv onDragStart={(event) => onDragStart(event, letter)} draggable>
			{letter}
		</LetterDiv>
	);
}

LetterPiece.propTypes = {
	letter: PropTypes.string.isRequired,
};
