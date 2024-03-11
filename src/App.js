import React, { useState } from "react";
import "./App.scss";
import QueryGenerator from "./components/QueryGenerator/QueryGenerator.js";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";

function App() {
    // State to manage whether the content is visible or not
    const [showContent, setShowContent] = useState(true);

    // Function to toggle the visibility of the content
    const toggleContent = () => {
        setShowContent((prevState) => !prevState);
    };

    return (
        <div>
            {/* Floating icon */}
            <div className="floating-icon app-mt-5" onClick={toggleContent}>
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
