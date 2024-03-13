import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";

const InitReact = async () => {
    let menuElement = await getAwaitedRow();

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

async function getAwaitedRow() {
    const MaxRetries = 40;
    let retires = 0;

    for (let i = 0; i < MaxRetries; i++) {
        let menuElement = document.querySelector("#main-row .content.row .col-md-12");

        if (!menuElement) {
            retires++;
        } else {
            return menuElement;
        }

        await sleep(1000);

        if (retires >= MaxRetries) {
            throw new Error("Failed to wait for root element");
        }
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log("Initializing Fancy Queries...");
await InitReact();
