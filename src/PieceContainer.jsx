import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ContainerDiv = styled.div`
	margin: 10px;
	border-color: ${(props) => props.theme.primary};
	border-style: solid;
	color: #333;
	display: inline-block;
	font-family: monospace;
	font-size: 32px;
	text-align: center;
	min-height: 60px;
	min-width: 50px;
`;

const onDragOver = (event) => {
	event.preventDefault();
};

const onDrop = (event) => {
	const letter = event.dataTransfer.getData("letter");
	console.log(letter);
};

export default function PieceContainer({ children }) {
	return (
		<ContainerDiv
			onDragOver={(event) => onDragOver(event)}
			onDrop={(event) => onDrop(event)}
		>
			{children}
		</ContainerDiv>
	);
}

PieceContainer.propTypes = {
	children: PropTypes.node,
};

PieceContainer.defaultProps = {
	children: null,
};
