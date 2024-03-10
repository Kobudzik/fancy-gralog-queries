// export function DoTheThang() {
//     // let realUrl =
//     //     "https://dev-graylog.local/search?q=NOT+source%3A+qa%5C-forsi%2A&rangetype=relative&streams=656495136ca0c071aff618ba&relative=7200";
//     // let realUrl2 =
//     //     "https://prod-graylog.lan/search?q=fields_logLevel%3AError+AND+NOT+message%3A%22An+error+has+occurred.+Message%3A+%5C%22Cannot+redirect+after+HTTP+headers+have+been+sent.%5C%22%22&rangetype=relative&streams=5a378946fc71dd03d29e0ca9&relative=432000";
//     // let queryFromUrl = getQueryFromUrl(realUrl2);
//     // return null;
// }

export function loadFromQuery() {
    return new URL(window.location.href).searchParams.get("q");
}

export function saveToQuery(query) {
    let encodedQuery = encodeURI(query);
    console.log(encodedQuery);
    let url = replaceQueryParam(window.location.href, "q", encodedQuery);
    window.open(url);
}

function replaceQueryParam(url, paramName, paramValue) {
    const pattern = new RegExp("(" + paramName + "=)([^&]*)");
    if (url.search(pattern) >= 0) {
        return url.replace(pattern, "$1" + paramValue);
    }
    return url + (url.indexOf("?") > 0 ? "&" : "?") + paramName + "=" + paramValue;
}
