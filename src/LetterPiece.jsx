import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CONTAINER_TYPE } from "./constants";

const LetterDiv = styled.div`
	color: ${(props) =>
		props.type === CONTAINER_TYPE.AVAILABLE
			? props.theme.primaryPiece
			: props.theme.secondaryPiece};
	display: inline-block;
	font-family: monospace;
	font-size: 50px;
	text-align: center;
	min-height: 60px;
	min-width: 50px;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	cursor: ${(props) => (props.disabled ? "not-allowed" : "grab")};
`;

export default function LetterPiece({
	letter,
	isDisabled,
	onDragStartHandler,
	type,
}) {
	return (
		<LetterDiv
			onDragStart={onDragStartHandler}
			draggable
			disabled={isDisabled}
			type={type}
		>
			{letter}
		</LetterDiv>
	);
}

LetterPiece.propTypes = {
	letter: PropTypes.string,
	isDisabled: PropTypes.bool,
	type: PropTypes.string.isRequired,
	onDragStartHandler: PropTypes.func,
};

LetterPiece.defaultProps = {
	letter: null,
	isDisabled: false,
	onDragStartHandler: null,
};
