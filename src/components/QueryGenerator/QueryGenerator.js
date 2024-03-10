import { useState } from "react";
import { Button } from "react-bootstrap";
import "./QueryGenerator.css";
import QueryListItem from "./QueryListItem/QueryListItem";
import { FaPlus } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import * as QueryManager from "./GraylogQueryManager/GraylogQueryManager";
import { ToastContainer, toast } from "react-toastify";

function QueryGenerator() {
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

    const extractQuery = () => {
        for (const item of items) {
            if (!item.field || !item.value) {
                toast("Please fill in all fields before extracting data.");
                return;
            }
        }

        if (items.filter((x) => !x.disabled).length === 0) {
            toast("There are zero enabled rows!");
        }

        var result = QueryManager.extractGraylogQuery(items);
        console.log(result);
    };

    const importQuery = () => {
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

    return (
        <div className="">
            <ToastContainer theme="dark" progressStyle={{ backgroundColor: "#d62518" }} />
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
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button data-testid="add-button" onClick={addNewItem} variant="success" className="mx-1">
                    <FaPlus />
                </Button>
            </div>
            <div className="d-flex flex-column gap-1 mt-5">
                <Button data-testid="extract-query-button" onClick={extractQuery} variant="success">
                    <FaArrowUp className="mx-1" />
                    Extract Query
                </Button>
                <Button data-testid="import-query-button" onClick={importQuery} variant="danger">
                    <FaArrowDown className="mx-1" />
                    Import Query
                </Button>
            </div>
        </div>
    );
}

export default QueryGenerator;
