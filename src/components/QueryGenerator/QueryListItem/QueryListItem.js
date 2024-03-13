import React from "react";
import { BsArrowClockwise } from "react-icons/bs";
import { IoMdRemove } from "react-icons/io";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import TextareaAutosize from "react-textarea-autosize";

function QueryListItem({
    item,
    index,
    onPropertyChanged,
    onToggleJoinCondition,
    onToggleReverse,
    onRemoveItem,
    onToggleDisable,
}) {
    let generateCircleIcon = () => {
        return <BsArrowClockwise style={{ position: "absolute", top: 2, right: 2, fontSize: "0.8em" }} size={12} />;
    };

    return (
        <div className="list-item-row start">
            <button
                onClick={() => onToggleJoinCondition(index)}
                className={`custom-button primary ${index === 0 ? "app-hidden" : "app-visible"}`}
                title="Condition"
                disabled={item.disabled}
                style={{ width: "100px" }}
            >
                {item.condition}
                {generateCircleIcon()}
            </button>
            <button
                onClick={() => onToggleReverse(index)}
                className={`custom-button ${item.reversed ? "success" : "danger"}`}
                title="Is reversed"
                disabled={item.disabled}
                style={{ minWidth: "90px" }}
            >
                <span style={{ fontStyle: !item.reversed && "italic" }}>{item.reversed ? "IS NOT" : "IS"}</span>
                {generateCircleIcon()}
            </button>
            <div className="custom-input-group">
                <input
                    value={item.field || ""}
                    onChange={(event) => onPropertyChanged("field", index, event)}
                    type="text"
                    placeholder="Field"
                    title="Field"
                    disabled={item.disabled}
                    style={{ maxWidth: "14rem", fontWeight: "bold" }}
                />
                <span className="app-mt-2">:</span>
                <TextareaAutosize
                    value={item.value || ""}
                    onChange={(event) => onPropertyChanged("value", index, event)}
                    type="textarea"
                    placeholder="Value"
                    title="Value"
                    disabled={item.disabled}
                    style={{ width: "100%", resize: "vertical" }}
                    maxRows={10}
                />
            </div>
            <button
                onClick={() => onToggleDisable(index)}
                title="Disable"
                className={`custom-button ${item.disabled ? "primary" : "danger"} mx-1`}
            >
                {item.disabled ? <LiaToggleOffSolid /> : <LiaToggleOnSolid />}
            </button>
            <button onClick={() => onRemoveItem(index)} title="Remove" className="custom-button danger mx-1">
                <IoMdRemove />
            </button>
        </div>
    );
}

export default QueryListItem;
