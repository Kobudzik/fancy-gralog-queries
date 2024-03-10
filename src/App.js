import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QueryGenerator from "./components/QueryGenerator/QueryGenerator.js";
import * as IntegrationScripts from "./scripts/IntegrationScripts.js";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";

function App() {
    IntegrationScripts.DoTheThang();

    // State to manage whether the content is visible or not
    const [showContent, setShowContent] = useState(false);

    // Function to toggle the visibility of the content
    const toggleContent = () => {
        setShowContent((prevState) => !prevState);
    };

    return (
        <div className="App">
            {/* Floating icon */}
            <div className="floating-icon mb-3" onClick={toggleContent}>
                <span style={{ fontFamily: "fantasy" }}>
                    Fancy
                    <span style={{ color: "red" }}> Queries </span>
                </span>
                {showContent ? <FaAnglesUp /> : <FaAnglesDown />}
            </div>

            {/* Conditional rendering of content based on state */}
            {showContent && (
                <div className="content">
                    <QueryGenerator />
                </div>
            )}
        </div>
    );
}

export default App;
