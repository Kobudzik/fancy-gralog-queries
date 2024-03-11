import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    query.split(/(?=OR|AND)/).forEach((item, index) => {
        let condition = null;
        let isReversed = false;

        let trimmedItem = item.trim();
        if (trimmedItem.indexOf("NOT ") > -1) {
            isReversed = true;
            trimmedItem = trimmedItem.replace("NOT ", "");
        }

        if (trimmedItem.indexOf("OR ") > -1) {
            condition = "OR";
            trimmedItem = trimmedItem.replace("OR ", "");
        } else if (trimmedItem.indexOf("AND ") > -1) {
            condition = "AND";
            trimmedItem = trimmedItem.replace("AND ", "");
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
        });
    });

    return itemList;
};
