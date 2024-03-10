import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";

const InitReact = () => {
    let menuElement = document.querySelector("#main-row .content.row .col-md-12");
    console.log("menuElement", menuElement);

    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "react-root");
    menuElement.appendChild(newDiv);

    // const body = document.querySelector("body");
    // const app = document.createElement("div");
    // app.id = "react-root";
    // body.prepend(app);

    const root = ReactDOM.createRoot(document.getElementById("react-root"));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

console.log("Initializing");
console.log("Script paused for 2 seconds");

setTimeout(() => {
    console.log("Timeout callback");
    InitReact();
}, 2000); //todo conditional time
