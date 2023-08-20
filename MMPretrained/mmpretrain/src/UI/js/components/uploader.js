import { uploadFile } from "../api/actions.js";
import { default as urls} from "../api/urls.js";
import { getBlob, getJson } from "../api/actions.js";
import { getOptions } from "../api/https-options.js";

async function handleOnClick(e){
    e.preventDefault();
    var fileInput = document.querySelector('input[type="file"]');
    const files = fileInput.files;
    // uploadFile(urls.upload_file, files[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    print(formData)
    const response = await fetch(urls.upload_file, {
        method: 'POST',
        body: formData, // string or object
    });
    const data = await response.json();
    console.log(data);

    // add data to table
    var retrieveTable = document.querySelector('#retriveTable');
    retrieveTable.replaceChildren()

    // add header
    var headers = document.createElement("tr")
    var lheaders = ["Image", "File Name", "Score"]
    for (let index = 0; index < lheaders.length; index++) {
        const name = lheaders[index];
        var header = document.createElement("th")
        header.innerText = name
        headers.appendChild(header)
    }

    retrieveTable.appendChild(headers)
     
    // add data
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        var headers = document.createElement("tr")

        // add image type
        var uri =urls.get_image + encodeURIComponent(element['img_path'])
        const response = await getBlob(uri, getOptions.typeImage.jpeg)  

        var header = document.createElement("th")
        var img = document.createElement("img")
        img.src = URL.createObjectURL(response);
        img.style = "display:block; height: 100px; width: 100;margin-left: auto;  margin-right: auto;"
        header.appendChild(img)
        headers.appendChild(header)

        // add string, int type
        var lheaders = [element['img_path'], element['match_score']]
        for (let index = 0; index < lheaders.length; index++) {
            const name = lheaders[index];
            var header = document.createElement("th")
            header.innerText = name
            headers.appendChild(header)
        }

        retrieveTable.appendChild(headers)
    }
    return false;
}

function handleOnSubmit(e){
    console.log("handle submit");
    e.preventDefault();    
}

function SetUpEventListener(submitInput){
    submitInput.addEventListener("click",  handleOnClick);
}

function SetUpUploader(submitInputId){
    const submitInput = document.querySelector(submitInputId);
    const form = document.querySelector("#uploadForm");
    form.addEventListener("submit", handleOnSubmit);

    SetUpEventListener(submitInput);
}





export {SetUpUploader}