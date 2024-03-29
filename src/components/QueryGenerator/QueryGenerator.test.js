import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import QueryGenerator from "./QueryGenerator";
import * as QueryManager from "./GraylogQueryManager/GraylogQueryManager";
import { toast } from "react-toastify";

describe("QueryGenerator", () => {
    beforeEach(() => {
        jest.spyOn(QueryManager, "extractGraylogQuery").mockReturnValue("");
        jest.spyOn(QueryManager, "importGraylogQuery").mockReturnValue([]);
        jest.mock("react-toastify", () => ({
            __esModule: true,
            toast: jest.fn().mockReturnValue(null),
        }));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders QueryGenerator component", () => {
        render(<QueryGenerator />);
        expect(screen.getByTestId("import-query-from-url-button")).toBeInTheDocument();
        expect(screen.getByTestId("import-query-from-string-button")).toBeInTheDocument();
        expect(screen.getByTestId("use-query-button")).toBeInTheDocument();
    });

    test("adds a new item when Add button is clicked", () => {
        //arrange
        render(<QueryGenerator />);
        fireEvent.change(screen.getByPlaceholderText("Field"), { target: { value: "testField" } });
        fireEvent.change(screen.getByPlaceholderText("Value"), { target: { value: "testValue" } });

        //Act
        fireEvent.click(screen.getByTestId("add-button"));

        // Assert
        expect(screen.getAllByPlaceholderText("Field")).toHaveLength(2);
        expect(screen.getAllByPlaceholderText("Value")).toHaveLength(2);
        expect(screen.getAllByTitle("Is reversed")).toHaveLength(2);
        expect(screen.getAllByTitle("Remove")).toHaveLength(2);
    });

    test("removes an item when Remove button is clicked", () => {
        render(<QueryGenerator />);
        fireEvent.click(screen.getAllByTitle("Remove")[0]);
        expect(screen.queryByText("Field")).toBeNull();
        expect(screen.queryByText("Value")).toBeNull();
        expect(screen.queryByText("Is reversed")).toBeNull();
        expect(screen.queryByText("Remove")).toBeNull();
    });

    test("extracts query when Extract Query button is clicked", () => {
        //arrange
        render(<QueryGenerator />);
        fireEvent.change(screen.getByPlaceholderText("Field"), { target: { value: "testField" } });
        fireEvent.change(screen.getByPlaceholderText("Value"), { target: { value: "testValue" } });

        //act
        fireEvent.click(screen.getByTestId("use-query-button"));

        //assert
        expect(QueryManager.extractGraylogQuery).toHaveBeenCalled();
    });

    test("extract query- toasts when no enabled rows", () => {
        //arrange
        render(<QueryGenerator />);

        //act
        fireEvent.change(screen.getByPlaceholderText("Field"), { target: { value: "testField" } });
        fireEvent.change(screen.getByPlaceholderText("Value"), { target: { value: "testValue" } });
        fireEvent.click(screen.getByTitle("Disable"));
        fireEvent.click(screen.getByTestId("use-query-button"));

        //assert
        expect(toast).toHaveBeenCalledWith("There are zero enabled rows!");
    });
});
