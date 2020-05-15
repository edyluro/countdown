import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import CountdownGame from "./CountdownGame";

const theme = {
	primary: "#1f779d",
	secondary: "#009680",
};

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CountdownGame />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
