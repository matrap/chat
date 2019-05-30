export function postRequest(path, content) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", path, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const obj = JSON.parse(xhr.responseText);
                    resolve(obj);
                } else {
                    reject({ error: "Wrong status request", details: xhr.status });
                }
            }
        };
        xhr.onerror = function (e) {
            reject({ error: "Request error", details: e });
        };
        xhr.send(content);
    });
}

export function getRequest(path) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const obj = JSON.parse(xhr.responseText);
                    resolve(obj);
                } else {
                    reject({ message: "Wrong status request", details: xhr.status });
                }
            }
        };
        xhr.onerror = function (e) {
            reject({ message: "Request error", details: e });
        };
        xhr.send(null);
    });
}
