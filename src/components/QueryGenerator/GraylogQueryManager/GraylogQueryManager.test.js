import { extractGraylogQuery, importGraylogQuery } from "./GraylogQueryManager";
import { toast } from "react-toastify";

describe("extractGraylogQuery", () => {
    test("returns an empty string when provided with an empty array", () => {
        // Arrange
        const items = [];

        // Act
        const result = extractGraylogQuery(items);

        // Assert
        expect(result).toBe("");
    });

    test("correctly extracts a query from an array of items with OR condition", () => {
        // Arrange
        const items = [
            { field: "field1", value: "value1", condition: null, reversed: false },
            { field: "field2", value: "value2", condition: "OR", reversed: true },
        ];

        // Act
        const result = extractGraylogQuery(items);

        // Assert
        expect(result).toBe("field1:value1 OR NOT field2:value2");
    });

    test("correctly extracts a query from an array of items with AND condition", () => {
        // Arrange
        const items = [
            { field: "field1", value: "value1", condition: null, reversed: false },
            { field: "field2", value: "value2", condition: "AND", reversed: true },
        ];

        // Act
        const result = extractGraylogQuery(items);

        // Assert
        expect(result).toBe("field1:value1 AND NOT field2:value2");
    });

    test("correctly extracts a query from an array of items with only AND conditions", () => {
        // Arrange
        const items = [
            { field: "field1", value: "value1", condition: null, reversed: false },
            { field: "field2", value: "value2", condition: "AND", reversed: false },
            { field: "field3", value: "value3", condition: "AND", reversed: false },
        ];

        // Act
        const result = extractGraylogQuery(items);

        // Assert
        expect(result).toBe("field1:value1 AND field2:value2 AND field3:value3");
    });

    test("correctly extracts a query from an array of items with only OR conditions", () => {
        // Arrange
        const items = [
            { field: "field1", value: "value1", condition: null, reversed: false },
            { field: "field2", value: "value2", condition: "OR", reversed: false },
            { field: "field3", value: "value3", condition: "OR", reversed: false },
        ];

        // Act
        const result = extractGraylogQuery(items);

        // Assert
        expect(result).toBe("field1:value1 OR field2:value2 OR field3:value3");
    });

    test("correctly extracts a query from an array of items with mixed conditions", () => {
        // Arrange
        const items = [
            { field: "field1", value: "value1", condition: null, reversed: false },
            { field: "field2", value: "value2", condition: "OR", reversed: false },
            { field: "field3", value: "value3", condition: "AND", reversed: false },
            { field: "field4", value: "value4", condition: "OR", reversed: false },
        ];

        // Act
        const result = extractGraylogQuery(items);

        // Assert
        expect(result).toBe("field1:value1 OR field2:value2 AND field3:value3 OR field4:value4");
    });
});

jest.mock("react-toastify", () => ({
    toast: jest.fn(),
}));

describe("importGraylogQuery", () => {
    test("returns an empty array when provided with an empty query", () => {
        // Arrange
        const query = "";

        // Act
        const result = importGraylogQuery(query);

        // Assert
        expect(result).toEqual([]);
    });

    test("correctly imports a query with mixed conditions and reversions", () => {
        // Arrange
        const query = "field1:value1 AND NOT field2:value2 OR field3:value3";

        // Act
        const result = importGraylogQuery(query);

        // Assert
        expect(result).toEqual([
            { field: "field1", value: "value1", condition: null, reversed: false },
            { field: "field2", value: "value2", condition: "AND", reversed: true },
            { field: "field3", value: "value3", condition: "OR", reversed: false },
        ]);
    });

    test("handles invalid query format by returning an empty array: not k:v format", () => {
        // Arrange
        const query = "invalid query";

        // Act
        const result = importGraylogQuery(query);

        // Assert
        expect(result).toEqual([]);
    });

    test("handles invalid query format by alerting: not k:v format", () => {
        // Arrange
        const query = "invalid query";

        // Act
        importGraylogQuery(query);

        // Assert
        expect(toast).toHaveBeenCalledWith("Invalid query format. Each condition must be in field:value format.");
    });

    test("handles invalid query format by alerting: unexpeced and/or marker", () => {
        // Arrange
        const query = "test:value AND";

        // Act
        importGraylogQuery(query);

        // Assert
        expect(toast).toHaveBeenCalledWith("Invalid query format, unexpected AND/OR marker.");
    });
});
