import React, { useState } from "react";
import "./App.scss";
import QueryGenerator from "./components/QueryGenerator/QueryGenerator.js";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";

function App() {
    const [showContent, setShowContent] = useState(true);

    const toggleContent = () => {
        setShowContent((prevState) => !prevState);
    };

    return (
        <div>
            <ToastContainer theme="dark" progressStyle={{ backgroundColor: "#d62518" }} position="bottom-center" />
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
