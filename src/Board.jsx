import React from "react";
import styled from "styled-components";

const CenteredDiv = styled.div`
	text-align: center;
`;

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

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			letters: {
				available: Array(9).fill(null),
				guessed: Array(5).fill(null),
			},
		};
	}

	render() {
		const { letters } = this.state;
		const { available, guessed } = letters;
		return (
			<div>
				<CenteredDiv>
					{available.map((letter) => {
						return <ContainerDiv> A </ContainerDiv>;
					})}
				</CenteredDiv>
				<CenteredDiv>
					{guessed.map((letter) => {
						return <ContainerDiv> A </ContainerDiv>;
					})}
				</CenteredDiv>
			</div>
		);
	}
}
