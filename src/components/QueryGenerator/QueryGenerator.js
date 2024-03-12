import { useEffect, useState, useRef } from "react";
import "./QueryGenerator.css";
import QueryListItem from "./QueryListItem/QueryListItem";
import { FaPlus } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import * as QueryManager from "./GraylogQueryManager/GraylogQueryManager";
import { toast } from "react-toastify";
import * as IntegrationScripts from "../../scripts/IntegrationScripts";
import GenerateGuid from "../../scripts/guidHelper";
import * as DisabledFiltersManager from "../../scripts/disabledFiltersManager";

function QueryGenerator() {
    const observer = useRef(null);

    useEffect(() => {
        filItems(IntegrationScripts.loadTextQueryFromGraylogInput());

        const targetNode = document.querySelector(".ace_line");
        const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === "childList" || mutation.type === "characterData") {
                    filItems(targetNode.textContent);
                }
            }
        };

        observer.current = new MutationObserver(callback);
        const config = {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true,
        };
        observer.current.observe(targetNode, config);

        return () => {
            observer.current.disconnect();
        };
    }, []);

    const getDefaultEmptyRowData = () => {
        return {
            field: "",
            value: "",
            condition: "AND",
            reversed: false,
            disabled: false,
            id: GenerateGuid(),
        };
    };

    const [items, setItems] = useState([]);

    const addNewItem = () => {
        if (items.length === 0) {
            setItems([getDefaultEmptyRowData()]);
            return;
        }

        //validate if can add
        // const lastItem = items[items.length - 1];
        // if (!lastItem.field || !lastItem.value) {
        //     toast("Please fill in the previous row before adding a new one.");
        //     return;
        // }

        setItems([...items, getDefaultEmptyRowData()]);
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
        let isUserDisabling = !items[index].disabled;
        if (!isUserDisabling) {
            DisabledFiltersManager.removeDisabledFilter(items[index]);
        }

        const updatedItems = [...items];
        updatedItems[index].disabled = !updatedItems[index].disabled;
        setItems(updatedItems);

        if (isUserDisabling) {
            DisabledFiltersManager.setDisabledFilter(items[index]);
        }
    };

    const removeItem = (index) => {
        DisabledFiltersManager.removeDisabledFilter(items[index]);

        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const extractQueryFromItems = () => {
        // if (items.filter((x) => !x.disabled).length === 0) {
        //     toast("There are zero enabled rows!");
        // }

        // for (const item of items) {
        //     if (!item.field || !item.value) {
        //         toast("Please fill in all fields before extracting data.");
        //         return;
        //     }
        // }

        return QueryManager.extractGraylogQuery(items);
    };

    const importQueryFromString = () => {
        const query = prompt("Enter query:");

        if (!query) {
            toast("Provide a query!");
            return;
        }

        var itemList = QueryManager.parseGraylogQueryToItems(query);

        if (itemList.length > 0) {
            setItems(itemList);
        }
    };

    const filItems = (query) => {
        setItems([]);
        setItemsFromQueryString(query);
        appendDisabledItemsFromStore();
    };

    const setItemsFromQueryString = (query) => {
        if (!query) {
            // toast("There was nothing to import");
            return;
        }

        var itemList = QueryManager.parseGraylogQueryToItems(query, false);
        if (itemList.length > 0) {
            setItems(itemList);
        }
    };

    const appendDisabledItemsFromStore = () => {
        let disabledFilters = DisabledFiltersManager.getDisabledFilters();
        if (disabledFilters) {
            setItems((oldItems) => (oldItems ? oldItems.concat(disabledFilters) : disabledFilters));
        }
    };

    const useQuery = () => {
        let query = extractQueryFromItems();
        let url = IntegrationScripts.getUrlForQuery(query);
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
                    <button data-testid="add-button" onClick={addNewItem} className="custom-button success mx-1" title="Add">
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
                    data-testid="use-query-button"
                    onClick={useQuery}
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
