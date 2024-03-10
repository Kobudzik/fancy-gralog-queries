import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
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
        <div className="list-item">
            <Button
                onClick={() => onToggleJoinCondition(index)}
                variant="secondary"
                className="me-2"
                style={{ width: "90px", visibility: index === 0 ? "hidden" : "visible", position: "relative" }}
                title="Condition"
                disabled={item.disabled}
            >
                {item.condition}
                {generateCircleIcon()}
            </Button>
            <Button
                onClick={() => onToggleReverse(index)}
                variant={item.reversed ? "danger" : "success"}
                className="me-2"
                style={{
                    width: "100px",
                    position: "relative",
                }}
                title="Is reversed"
                disabled={item.disabled}
            >
                <span style={{ color: !item.reversed && "darkgray", fontStyle: !item.reversed && "italic" }}>
                    {item.reversed ? "IS NOT" : "IS"}
                </span>
                {generateCircleIcon()}
            </Button>
            <InputGroup>
                <FormControl
                    value={item.field || ""}
                    onChange={(event) => onPropertyChanged("field", index, event)}
                    type="text"
                    placeholder="Field"
                    title="Field"
                    style={{ maxWidth: "15rem" }}
                    disabled={item.disabled}
                />
                <InputGroup.Text>:</InputGroup.Text>
                <FormControl
                    value={item.value || ""}
                    onChange={(event) => onPropertyChanged("value", index, event)}
                    type="text"
                    placeholder="Value"
                    title="Value"
                    disabled={item.disabled}
                />
            </InputGroup>
            <Button onClick={() => onRemoveItem(index)} title="Remove" variant="danger" className="mx-1">
                <IoMdRemove />
            </Button>
            <Button
                onClick={() => onToggleDisable(index)}
                title="Disable"
                variant={item.disabled ? "primary" : "danger"}
                className="mx-1"
            >
                {item.disabled ? <LiaToggleOffSolid /> : <LiaToggleOnSolid />}
            </Button>
        </div>
    );
}

export default QueryListItem;
