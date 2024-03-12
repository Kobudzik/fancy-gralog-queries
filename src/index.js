import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";

const InitReact = () => {
    let menuElement = waitForRoot();

    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "react-root");
    menuElement.appendChild(newDiv);

    const root = ReactDOM.createRoot(document.getElementById("react-root"));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

//wait for div

function waitForRoot() {
    const MaxRetries = 20;
    let retires = 0;
    for (let i = 0; i < MaxRetries; i++) {
        let menuElement = document.querySelector("#main-row .content.row .col-md-12");

        if (!menuElement) {
            retires++;
        } else {
            return menuElement;
        }

        setTimeout(() => {}, 100);

        if (retires >= MaxRetries) {
            throw new Error("Failed to wait for roort");
        }
    }
}

console.log("Initializing Fancy Queries...");
InitReact();
