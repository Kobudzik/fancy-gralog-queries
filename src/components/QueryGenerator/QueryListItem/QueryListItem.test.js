import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import QueryListItem from "./QueryListItem";

describe("QueryListItem tests", () => {
    const mockItem = {
        field: "exampleField",
        value: "exampleValue",
        condition: "AND",
        reversed: false,
    };

    it("renders correctly initialized", () => {
        //arrange
        render(<QueryListItem item={mockItem} index={0} />);

        //act

        //assert
        expect(screen.getByTitle("Condition")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Field")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Value")).toBeInTheDocument();
        expect(screen.getByTitle("Remove")).toBeInTheDocument();
    });

    it("calls onToggleJoinCondition when the condition button is clicked", () => {
        // Arrange
        const onToggleJoinCondition = jest.fn();
        const itemIndex = 7;
        const mockItem = { condition: "AND" }; // Define mockItem
        render(<QueryListItem item={mockItem} index={itemIndex} onToggleJoinCondition={onToggleJoinCondition} />);

        // Act
        fireEvent.click(screen.getByTitle("Condition"));

        // Assert
        expect(onToggleJoinCondition).toHaveBeenCalledTimes(1);
        expect(onToggleJoinCondition).toHaveBeenCalledWith(itemIndex);
    });

    it("calls onToggleReverse when the reverse button is clicked", () => {
        //arrange
        const onToggleReverse = jest.fn();
        const itemIndex = 7;
        render(<QueryListItem item={mockItem} index={itemIndex} onToggleReverse={onToggleReverse} />);

        //act
        fireEvent.click(screen.getByText("IS"));

        //assert
        expect(onToggleReverse).toHaveBeenCalledTimes(1);
        expect(onToggleReverse).toHaveBeenCalledWith(itemIndex);
    });

    it("calls onRemoveItem when the remove button is clicked", () => {
        //arrange
        const onRemoveItem = jest.fn();
        const itemIndex = 7;
        render(<QueryListItem item={mockItem} index={itemIndex} onRemoveItem={onRemoveItem} />);

        //act
        fireEvent.click(screen.getByTitle("Remove"));

        //assert
        expect(onRemoveItem).toHaveBeenCalledTimes(1);
        expect(onRemoveItem).toHaveBeenCalledWith(itemIndex);
    });

    it("calls onPropertyChanged when input values change", () => {
        // Arrange
        const onPropertyChanged = jest.fn();
        render(<QueryListItem item={mockItem} index={0} onPropertyChanged={onPropertyChanged} />);
        const fieldInput = screen.getByPlaceholderText("Field");
        const valueInput = screen.getByPlaceholderText("Value");

        // Act
        let fieldEventData = { target: { value: "newFieldValue" } };
        fireEvent.change(fieldInput, fieldEventData);
        fireEvent.change(valueInput, { target: { value: "newValue" } });

        // Assert
        expect(onPropertyChanged).toHaveBeenCalledTimes(2);
        expect(onPropertyChanged).toHaveBeenCalledWith("field", 0, expect.anything()); // Expect any value for target
        expect(onPropertyChanged).toHaveBeenCalledWith("value", 0, expect.anything()); // Expect any value for target
    });

    it("renders properly with different item properties: OR reversed", () => {
        //arrange
        render(<QueryListItem item={{ ...mockItem, condition: "OR", reversed: true }} index={0} />);

        //act

        //assert
        expect(screen.getByText("OR")).toBeInTheDocument();
        expect(screen.getByText("IS NOT")).toBeInTheDocument();
    });

    it("renders properly with different item properties: AND not reversed", () => {
        //arrange
        render(<QueryListItem item={{ ...mockItem, condition: "AND", reversed: false }} index={0} />);

        //act

        //assert
        expect(screen.getByText("AND")).toBeInTheDocument();
        expect(screen.getByText("IS")).toBeInTheDocument();
    });

    it("renders properly with empty field and value", () => {
        //arrange
        render(<QueryListItem item={{ ...mockItem, field: "", value: "" }} index={0} />);

        //act

        //assert
        expect(screen.getByPlaceholderText("Field")).toHaveValue("");
        expect(screen.getByPlaceholderText("Value")).toHaveValue("");
    });
});
