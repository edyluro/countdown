import React from "react";
import styled from "styled-components";

import Board from "./Board";

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

export default function CountdownGame() {
	return (
		<div>
			<H2>Create the word by dragging letters into the empty boxes</H2>
			<H4>You have one minute</H4>
			<Board />
		</div>
	);
}
