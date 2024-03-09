import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QueryGenerator from "./components/QueryGenerator/QueryGenerator.js";
import * as myScripts from "./scripts/myScripts.js";

function App() {
    myScripts.DoTheThang();
    return (
        <div className="App">
            <QueryGenerator />
        </div>
    );
}

export default App;
