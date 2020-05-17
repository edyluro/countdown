import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import CountdownGame from "./CountdownGame";

const theme = {
	primary: "#136f97",
	secondary: "#22bcff",
	primaryPiece: "#009680",
	secondaryPiece: "#1d305b",
	primaryFrame: "#343a40",
	successFrame: "#7bc44c",
	dangerFrame: "#c52d30",
};

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CountdownGame />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
