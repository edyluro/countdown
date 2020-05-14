import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

const theme = {
	primary: "#1f779d",
	secondary: "#009680",
};

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme} />
	</React.StrictMode>,
	document.getElementById("root")
);
