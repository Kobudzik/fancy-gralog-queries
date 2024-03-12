import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenerateGuid from "../../../scripts/guidHelper";

export const extractGraylogQuery = (items) => {
    return items
        .filter((x) => !x.disabled)
        .reduce((result, item) => {
            //if result exists aka not the first item iteration
            if (result) {
                result += ` ${item.condition} `;
            }

            if (item.reversed === true) {
                result += "NOT ";
            }

            return result + `${item.field}:${item.value}`;
        }, "");
};

export const parseGraylogQueryToItems = (query, shouldValidate = true) => {
    const itemList = [];
    if (query.startsWith("AND") || query.startsWith("OR")) {
        return;
    }

    // Split the string by "OR" or "AND" but not within parentheses
    query.split(/\s+(?=AND(?![^(]*\))|OR(?![^(]*\)))/).forEach((item, index) => {
        console.log(item);
        let condition = null;
        let isReversed = false;

        let trimmedItem = item.trim();
        if (trimmedItem.indexOf("NOT ") > -1) {
            isReversed = true;
            trimmedItem = trimmedItem.replace("NOT ", "");
        }

        let orIndex = indexOfValueNotInParentheses(trimmedItem, "OR");
        let andIndex = indexOfValueNotInParentheses(trimmedItem, "AND");

        if (orIndex > -1) {
            condition = "OR";
            trimmedItem = removeSubstring(trimmedItem, orIndex, 2).trim();
        } else if (andIndex > -1) {
            condition = "AND";
            trimmedItem = removeSubstring(trimmedItem, andIndex, 3).trim();
        } else if (index !== 0 && condition == null) {
            if (shouldValidate) {
                toast("Invalid query format, unexpected AND/OR marker.");
            }
            return;
        }

        let fieldValueBreakpoint = trimmedItem.indexOf(":");
        let fieldPart = trimmedItem.substring(0, fieldValueBreakpoint);
        let valuePart = trimmedItem.substring(fieldValueBreakpoint + 1);

        if (!valuePart && shouldValidate) {
            toast("Invalid query format. Each condition must be in field:value format.");
            if (shouldValidate) {
                return;
            }
        }

        itemList.push({
            field: fieldPart,
            value: valuePart,
            condition: condition,
            reversed: isReversed,
            id: GenerateGuid(),
        });
    });

    return itemList;
};

function indexOfValueNotInParentheses(inputString, value) {
    let isInParentheses = 0;

    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === "(") {
            isInParentheses++;
        } else if (inputString[i] === ")") {
            isInParentheses--;
        } else if (inputString.substring(i, i + value.length) === value && isInParentheses === 0) {
            return i;
        }
    }

    return -1; // Return -1 if "OR" not found outside parentheses
}

function removeSubstring(str, startIndex, endIndex) {
    return str.substring(0, startIndex) + str.substring(endIndex);
}
