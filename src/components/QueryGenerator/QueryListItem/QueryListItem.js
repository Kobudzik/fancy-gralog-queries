import { Button, InputGroup, FormControl } from "react-bootstrap";
import { BsArrowClockwise } from "react-icons/bs";
import { IoMdRemove } from "react-icons/io";

function QueryListItem({ item, index, onPropertyChanged, onToggleJoinCondition, onToggleReverse, onRemoveItem }) {
    return (
        <div className="list-item">
            <Button
                onClick={() => onToggleJoinCondition(index)}
                variant="secondary"
                className="me-2"
                style={{ width: "90px", visibility: index === 0 ? "hidden" : "visible", position: "relative" }}
                title="Condition"
            >
                {item.condition}
                <BsArrowClockwise style={{ position: "absolute", top: 0, right: 0, fontSize: "0.8em" }} size={12} />
            </Button>
            <Button
                onClick={() => onToggleReverse(index)}
                disabled={item.reversed === 0}
                variant={item.reversed ? "danger" : "success"}
                className="me-2"
                style={{ width: "90px", position: "relative" }}
                title="Is reversed"
            >
                <span>
                    {item.reversed ? "NOT" : "\u00A0"}
                    <BsArrowClockwise style={{ position: "absolute", top: 0, right: 0, fontSize: "0.8em" }} size={12} />
                </span>
            </Button>
            <InputGroup>
                <FormControl
                    value={item.field || ""}
                    onChange={(event) => onPropertyChanged("field", index, event)}
                    type="text"
                    placeholder="Field"
                    title="Field"
                    style={{ maxWidth: "15rem" }}
                />
                <InputGroup.Text>:</InputGroup.Text>
                <FormControl
                    value={item.value || ""}
                    onChange={(event) => onPropertyChanged("value", index, event)}
                    type="text"
                    placeholder="Value"
                    title="Value"
                />
            </InputGroup>
            <Button onClick={() => onRemoveItem(index)} title="Remove" variant="warning" className="mx-1">
                <IoMdRemove />
            </Button>
        </div>
    );
}

export default QueryListItem;
