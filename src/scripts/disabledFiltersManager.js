import * as LocalStorageManager from "./localStorageManager";

export function setDisabledFilter(item) {
    let items = this.getDisabledFilters();
    if (items) {
        let existingItemIndex = items.findIndex((x) => x.id === item.id);
        if (existingItemIndex > -1) {
            items[existingItemIndex] = item;
        } else {
            items.push(item);
        }
    } else {
        items = [item];
    }

    LocalStorageManager.setItem("disabledFilters", JSON.stringify(items));
}

export function removeDisabledFilter(item) {
    let items = this.getDisabledFilters();
    let existingItemIndex = items.findIndex((x) => x.id === item.id);
    if (existingItemIndex > -1) {
        items.splice(existingItemIndex, 1);
    }

    LocalStorageManager.setItem("disabledFilters", JSON.stringify(items));
}

export function getDisabledFilters() {
    return JSON.parse(LocalStorageManager.getItem("disabledFilters"));
}
