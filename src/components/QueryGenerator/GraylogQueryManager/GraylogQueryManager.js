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

export const importGraylogQuery = (query) => {
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
            toast("Invalid query format, unexpected AND/OR marker.");
            return;
        }

        const parts = trimmedItem.split(":");

        if (parts.length !== 2) {
            toast("Invalid query format. Each condition must be in field:value format.");
            return;
        }

        itemList.push({
            field: parts[0].trim(),
            value: parts[1].trim(),
            condition: condition,
            reversed: isReversed,
        });
    });

    return itemList;
};
