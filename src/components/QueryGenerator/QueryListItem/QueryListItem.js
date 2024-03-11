import React from "react";
import { BsArrowClockwise } from "react-icons/bs";
import { IoMdRemove } from "react-icons/io";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";

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
        return <BsArrowClockwise style={{ position: "absolute", top: 0, right: 0, fontSize: "0.8em" }} size={12} />;
    };

    return (
        <div className="list-item-row">
            <button
                onClick={() => onToggleJoinCondition(index)}
                className={`custom-button primary ${index === 0 ? "hidden" : "visible"}`}
                title="Condition"
                disabled={item.disabled}
                style={{ width: "100px" }}
            >
                {item.condition}
                {generateCircleIcon()}
            </button>
            <button
                onClick={() => onToggleReverse(index)}
                className={`custom-button ${item.reversed ? "danger" : "success"}`}
                title="Is reversed"
                disabled={item.disabled}
                style={{ width: "110px" }}
            >
                <span style={{ color: !item.reversed && "darkgray", fontStyle: !item.reversed && "italic" }}>
                    {item.reversed ? "IS NOT" : "IS"}
                </span>
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
                    style={{ maxWidth: "10rem" }}
                />
                <span>:</span>
                <input
                    value={item.value || ""}
                    onChange={(event) => onPropertyChanged("value", index, event)}
                    type="text"
                    placeholder="Value"
                    title="Value"
                    disabled={item.disabled}
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
