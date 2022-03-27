import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ThemeProdiver } from "./context/ThemeContext";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <ThemeProdiver>
    <App />
  </ThemeProdiver>,
  document.getElementById("root")
);

reportWebVitals();
