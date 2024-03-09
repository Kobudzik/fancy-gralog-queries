import { useState } from "react";
import { Button } from "react-bootstrap";
import "./QueryGenerator.css";
import QueryListItem from "./QueryListItem/QueryListItem";

function QueryGenerator() {
    const [items, setItems] = useState([{ field: "", value: "", condition: null, reversed: false }]);

    const addNewItem = () => {
        let defaultEmptyRowData = { field: "", value: "", condition: "AND", reversed: false };

        if (items.length === 0) {
            setItems([defaultEmptyRowData]);
            return;
        }

        //validate if can add
        const lastItem = items[items.length - 1];
        if (!lastItem.field || !lastItem.value) {
            alert("Please fill in the previous row before adding a new one.");
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

    const removeItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const extractQuery = () => {
        //validation
        for (const item of items) {
            if (!item.field || !item.value) {
                alert("Please fill in all fields before extracting data.");
                return;
            }
        }

        const extractedData = items.reduce((result, item) => {
            //if result exists aka not the first item iteration
            if (result) {
                result += ` ${item.condition} `;
            }

            if (item.reversed === true) {
                result += "NOT ";
            }

            return result + `${item.field}:${item.value}`;
        }, "");

        console.log(extractedData);
    };

    const importQuery = () => {
        const query = prompt("Enter query:");
        if (!query) return;

        const itemList = [];

        query.split(/(?=OR|AND)/).forEach((item, index) => {
            let condition = null;
            let isReversed = false;
            let trimmedItem = item.trim();

            if (trimmedItem.indexOf("NOT ") > -1) {
                isReversed = true;
                trimmedItem = trimmedItem.replace("NOT ", "");
            }

            if (trimmedItem.indexOf("OR ") > -1) {
                condition = "OR";
                trimmedItem = trimmedItem.replace("OR ", "");
            } else if (trimmedItem.indexOf("AND ") > -1) {
                condition = "AND";
                trimmedItem = trimmedItem.replace("AND ", "");
            } else if (index !== 0 && condition == null) {
                alert("Invalid query format, unexpected AND/OR marker");
            }

            const parts = trimmedItem.split(":");

            if (parts.length !== 2) {
                alert("Invalid query format. Each condition must be in field:value format.");
                return;
            }

            itemList.push({
                field: parts[0].trim(),
                value: parts[1].trim(),
                condition: condition,
                reversed: isReversed,
            });
        });

        if (itemList.length === 0) {
            alert("Invalid query format. The query must contain at least one condition (OR/AND) separating field:value pairs.");
            return;
        }

        setItems(itemList);
    };

    return (
        <div className="list-container">
            {items.map((item, index) => (
                <QueryListItem
                    key={index}
                    item={item}
                    index={index}
                    onPropertyChanged={handlePropertyValueChange}
                    onToggleJoinCondition={toggleJoinCondition}
                    onToggleReverse={toggleReverse}
                    onRemoveItem={removeItem}
                />
            ))}
            <Button onClick={addNewItem} variant="primary" className="mb-2">
                Add
            </Button>
            <Button onClick={extractQuery} variant="success" className="mb-2">
                Extract Query
            </Button>
            <Button onClick={importQuery} variant="info">
                Import Query
            </Button>
        </div>
    );
}

export default QueryGenerator;
