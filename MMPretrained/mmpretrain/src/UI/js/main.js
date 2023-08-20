import { convertBlobToImage, 
        convertBlobToVideo,
        previewUpdateImage } from "./utils/handle-image.js";
import { default as urls} from "./api/urls.js";
import { getBlob, getJson } from "./api/actions.js";
import { getOptions } from "./api/https-options.js";
import { SetUpUploader } from "./components/uploader.js";


async function handleOnClick(e){
    e.preventDefault();    
    var fileInput = document.querySelector('#query');
    const formData = new FormData();
    formData.append("query", fileInput.value);
    
    const response = await fetch(urls.text_retrieve + encodeURIComponent(fileInput.value), {
        method: 'POST',
        body: formData, // string or object
        headers: {
            "Content-Type": "application/json",
          },
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

// event listener
window.addEventListener('load', function() {    
    previewUpdateImage('uploader', 'myImg')
    
    SetUpUploader("#submitInput")

    var types = document.getElementById("selectInput");
    var imgInputSection = document.getElementById("inputImage");
    var textInputSection = document.getElementById("inputText");

    types.addEventListener("change", function() {
        if(types.value == "text")
        {
            imgInputSection.style.display = "none"
            textInputSection.style.display = "block"
        }
        if(types.value == "img")
        {
            imgInputSection.style.display = "block"
            textInputSection.style.display = "none"
        }
    });

    const submitInput = document.querySelector("#submitInputText");
    submitInput.addEventListener("click",  handleOnClick);
});

// main loop
async function main(url) {
    // Get title
    //const hello = await getJson(urls.root, getOptions.typeApplication.json)
    //document.getElementById("title").innerHTML = hello.message;

	// Get image    	
	//const response = await getBlob(urls.plot_iris, getOptions.typeImage.png)        

	// Display image in tab image have id avatar
    //convertBlobToImage(response, "avatar")

    // video
    //const vresponse = await getBlob(urls.video, getOptions.typeApplication.mp4) 

    // Display video in tab vidoe have id myvideo and source mp4_src
    //convertBlobToVideo(vresponse, "myvideo", "mp4_src")

    // Init retrieve table
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
    console.log("asdfjlksadjf");
}

// Calling that async function
main();

