const namespace = "FancyQueries";

export function setItem(key, value) {
    localStorage.setItem(`${namespace}:${key}`, JSON.stringify(value));
}

export function getItem(key) {
    const item = localStorage.getItem(`${namespace}:${key}`);
    return item ? JSON.parse(item) : null;
}

export function removeItem(key) {
    localStorage.removeItem(`${namespace}:${key}`);
}

export function clear() {
    const keysToRemove = Object.keys(localStorage).filter((key) => key.startsWith(`${namespace}:`));
    keysToRemove.forEach((key) => localStorage.removeItem(key));
}
