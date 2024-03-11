import { useEffect, useState } from "react";
import "./QueryGenerator.css";
import QueryListItem from "./QueryListItem/QueryListItem";
import { FaPlus } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import * as QueryManager from "./GraylogQueryManager/GraylogQueryManager";
import { toast } from "react-toastify";
import * as IntegrationScripts from "../../scripts/IntegrationScripts";

function QueryGenerator() {
    useEffect(() => {
        importQueryFromUrl();
    }, []);

    let defaultEmptyRowData = { field: "", value: "", condition: "AND", reversed: false, disabled: false };

    const [items, setItems] = useState([defaultEmptyRowData]);

    const addNewItem = () => {
        if (items.length === 0) {
            setItems([defaultEmptyRowData]);
            return;
        }

        //validate if can add
        const lastItem = items[items.length - 1];
        if (!lastItem.field || !lastItem.value) {
            toast("Please fill in the previous row before adding a new one.");
            return;
        }

        setItems([...items, defaultEmptyRowData]);
    };

    const handlePropertyValueChange = (property, index, event) => {
        if (property === "field") {
            if (!/^[a-zA-Z0-9]*$/.test(event.target.value) || !event.target.value === "") {
                return;
            }
        }

        const updatedItems = [...items];
        updatedItems[index] = {
            ...updatedItems[index],
            [property]: event.target.value,
        };
        setItems(updatedItems);
    };

    const toggleJoinCondition = (index) => {
        const updatedItems = [...items];
        updatedItems[index].condition = updatedItems[index].condition === "OR" ? "AND" : "OR";
        setItems(updatedItems);
    };

    const toggleReverse = (index) => {
        const updatedItems = [...items];
        updatedItems[index].reversed = !updatedItems[index].reversed;
        setItems(updatedItems);
    };

    const toggleDisable = (index) => {
        const updatedItems = [...items];
        updatedItems[index].disabled = !updatedItems[index].disabled;
        setItems(updatedItems);
    };

    const removeItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const extractQueryFromItems = () => {
        if (items.filter((x) => !x.disabled).length === 0) {
            toast("There are zero enabled rows!");
        }

        for (const item of items) {
            if (!item.field || !item.value) {
                toast("Please fill in all fields before extracting data.");
                return;
            }
        }

        return QueryManager.extractGraylogQuery(items);
    };

    const importQueryFromString = () => {
        const query = prompt("Enter query:");

        if (!query) {
            toast("Provide a query!");
            return;
        }

        var itemList = QueryManager.importGraylogQuery(query);

        if (itemList.length > 0) {
            setItems(itemList);
        }
    };

    const importQueryFromUrl = () => {
        let query = IntegrationScripts.loadFromQuery();

        if (!query) {
            toast("There was nothing to import");
            return;
        }

        var itemList = QueryManager.importGraylogQuery(query);
        if (itemList.length > 0) {
            setItems(itemList);
        }
    };

    const pushQueryToUrl = () => {
        let query = extractQueryFromItems();
        if (!query) return;
        let url = IntegrationScripts.getEditedQuery(query);
        window.location.href = url;
    };

    return (
        <div className="app-mt-2">
            <div className="list-item-column">
                {items.map((item, index) => (
                    <QueryListItem
                        key={index}
                        item={item}
                        index={index}
                        onPropertyChanged={handlePropertyValueChange}
                        onToggleJoinCondition={toggleJoinCondition}
                        onToggleReverse={toggleReverse}
                        onToggleDisable={toggleDisable}
                        onRemoveItem={removeItem}
                    />
                ))}
            </div>

            <div className="list-item-column app-mt-2" style={{ alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <button data-testid="add-button" onClick={addNewItem} className="custom-button success mx-1">
                        <FaPlus />
                    </button>
                </div>
                <button
                    data-testid="import-query-from-string-button"
                    onClick={importQueryFromString}
                    className="custom-button danger"
                    style={{ minWidth: "200px" }}
                >
                    <div className="list-item-row center">
                        <FaArrowDown className="app-mr-1" />
                        Import from string
                    </div>
                </button>
                <button
                    data-testid="import-query-from-url-button"
                    onClick={importQueryFromUrl}
                    className="custom-button danger"
                    style={{ minWidth: "200px" }}
                >
                    <div className="list-item-row center">
                        <FaArrowDown className="app-mr-1" />
                        Import from url
                    </div>
                </button>
                <button
                    data-testid="use-query-button"
                    onClick={pushQueryToUrl}
                    className="custom-button success"
                    style={{ minWidth: "200px" }}
                >
                    <div className="list-item-row center">
                        <FaArrowUp className="app-mr-1" />
                        Use query
                    </div>
                </button>
            </div>
        </div>
    );
}

export default QueryGenerator;
