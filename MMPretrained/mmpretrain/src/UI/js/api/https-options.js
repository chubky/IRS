var options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    
}

var getOptions = {
    typeApplication : {        
        json: Object.assign({}, options, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            },
        })
    },
    typeImage : {
        png: Object.assign({}, options, {
            method: "GET", 
            headers: {
                "Content-Type": "image/png",
            },
        }),
        jpeg: Object.assign({}, options, {
            method: "GET", 
            headers: {
                "Content-Type": "image/jpeg",
            },
        }),
    },
    typeVideo : {
        mp4: Object.assign({}, options, {
            method: "GET", 
            headers: {
                "Content-Type": "video/mp4",
            },
        }),
    },
}

export { getOptions }