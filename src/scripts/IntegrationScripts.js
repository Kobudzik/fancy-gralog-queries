export function loadTextQueryFromGraylogInput() {
    return document.querySelector(".ace_line").textContent;
}

export function loadTextQueryFromUrl() {
    return new URL(window.location.href).searchParams.get("q");
}

export function setGraylogInput(input) {
    document.querySelector(".ace_line").textContent = input;
}

export function getUrlForQuery(query) {
    if (query) {
        let encodedQuery = encodeURI(query);
        return replaceQueryParam(window.location.href, "q", encodedQuery);
    }
    return replaceQueryParam(window.location.href, "q", "");
}

function replaceQueryParam(url, paramName, paramValue) {
    const pattern = new RegExp("(" + paramName + "=)([^&]*)");
    if (url.search(pattern) >= 0) {
        return url.replace(pattern, "$1" + paramValue);
    } else {
        return url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue;
    }
}
