import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import QueryGenerator from "./components/QueryGenerator/QueryGenerator.js";
import * as IntegrationScripts from "./scripts/IntegrationScripts.js";

function App() {
    IntegrationScripts.DoTheThang();
    return (
        <div className="App">
            <QueryGenerator />
        </div>
    );
}

export default App;
