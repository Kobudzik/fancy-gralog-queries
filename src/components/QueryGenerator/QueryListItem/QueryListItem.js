import { Button, InputGroup, FormControl } from "react-bootstrap";

function QueryListItem({ item, index, onPropertyChanged, onToggleJoinCondition, onToggleReverse, onRemoveItem }) {
    return (
        <div className="list-item">
            <Button
                onClick={() => onToggleJoinCondition(index)}
                variant="secondary"
                className="me-2"
                style={{ width: "90px", visibility: index === 0 ? "hidden" : "visible" }}
                title="Condition"
            >
                {item.condition}
            </Button>
            <Button
                onClick={() => onToggleReverse(index)}
                disabled={item.reversed === 0}
                variant={item.reversed ? "danger" : "success"}
                className="me-2"
                style={{ width: "90px" }}
                title="Is reversed"
            >
                {item.reversed ? "NOT" : "\u00A0"}
            </Button>
            <InputGroup>
                <FormControl
                    value={item.field || ""}
                    onChange={(event) => onPropertyChanged("field", index, event)}
                    type="text"
                    placeholder="Field"
                    title="Field"
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
            <Button onClick={() => onRemoveItem(index)} title="Remove" variant="warning" className="ms-2">
                Remove
            </Button>
        </div>
    );
}

export default QueryListItem;
