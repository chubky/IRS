const host = "http://127.0.0.1:8000"
var urls = {
    root: host + "/",
    hello: host + "/my-first-api",
    get_iris: host + "/get-iris",
    get_image: host + "/images/",
    plot_iris: host + "/plot-iris",
    video: host + "/video",
    upload_file: host + "/uploadfile",
    text_retrieve: host + "/retrieve-by-text?query=",
}
export default urls;