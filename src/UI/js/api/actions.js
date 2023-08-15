function getBlob(url, options){
    return fetch(url, options)
        .then(res => {
            if (res.ok) return res.blob();
        })
        .catch(err => {
            alert(err);
            return Promise.reject('Request failed');
        });
}

function getJson(url, options){
    return fetch(url, options)
        .then(res => {
            if (res.ok) return res.json();
        })
        .catch(err => {
            alert(err);
            return Promise.reject('Request failed');
        });
}

// upload image
function uploadFile(url, file) {
    const API_ENDPOINT = "http://127.0.0.1:8000/uploadfile";
    const request = new XMLHttpRequest();
    const formData = new FormData();

    request.open("POST", url, true);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
        console.log(request.responseText);
        }
    };
    formData.append("file", file);
    request.send(formData)
    return false
};

export {getBlob, getJson, uploadFile}