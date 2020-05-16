import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MAXIMUM_SECONDS } from "./constants";

const TimerH1 = styled.h1`
	font-family: sans-serif;
	font-weight: 300;
	color: ${(props) => (props.danger ? "red" : props.theme.secondary)};
`;

const numberForTimer = (number) => {
	if (number < 0) {
		return "00";
	}
	if (number < 10) {
		return `0${number}`;
	}
	return number;
};

export default class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			remainingTime: MAXIMUM_SECONDS,
			danger: false,
		};
	}

	componentDidMount() {
		const { timeUpHandler } = this.props;
		this.interval = setInterval(() => {
			const { remainingTime } = this.state;
			if (remainingTime > 0) {
				this.setState((prevState) => ({
					...prevState,
					remainingTime: prevState.remainingTime - 1,
				}));
			}
			if (remainingTime === 0) {
				clearInterval(this.interval);
				this.setState(
					(prevState) => ({
						...prevState,
						danger: true,
					}),
					timeUpHandler
				);
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { remainingTime, danger } = this.state;
		const minutes = Math.floor(remainingTime / 60) || 0;
		const seconds = Math.floor(remainingTime - minutes * 60) || 0;
		const timeStr = `${numberForTimer(minutes)}:${numberForTimer(seconds)}`;
		return <TimerH1 danger={danger}>{timeStr}</TimerH1>;
	}
}

Timer.propTypes = {
	timeUpHandler: PropTypes.func.isRequired,
};
