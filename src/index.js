import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";

const body = document.querySelector("body");
const app = document.createElement("div");
app.id = "react-root";
body.prepend(app);

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
