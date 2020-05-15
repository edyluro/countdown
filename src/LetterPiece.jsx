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
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default function LetterPiece({
	letter,
	isDraggable,
	isGuessed,
	isDisabled,
	onDragStartHandler,
}) {
	return (
		<LetterDiv
			onDragStart={(event) =>
				onDragStartHandler(event, { letter, isDraggable, isGuessed })
			}
			draggable={isDraggable}
			disabled={isDisabled}
		>
			{letter}
		</LetterDiv>
	);
}

LetterPiece.propTypes = {
	letter: PropTypes.string,
	isDraggable: PropTypes.bool,
	isGuessed: PropTypes.bool,
	isDisabled: PropTypes.bool,
	onDragStartHandler: PropTypes.func,
};

LetterPiece.defaultProps = {
	letter: null,
	isDisabled: false,
	isDraggable: true,
	isGuessed: false,
	onDragStartHandler: null,
};
