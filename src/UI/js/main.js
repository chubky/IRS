import { convertBlobToImage, 
        convertBlobToVideo,
        previewUpdateImage } from "./utils/handle-image.js";
import { default as urls} from "./api/urls.js";
import { getBlob, getJson } from "./api/actions.js";
import { getOptions } from "./api/https-options.js";
import { SetUpUploader } from "./components/uploader.js";

// event listener
window.addEventListener('load', function() {    
    previewUpdateImage('uploader', 'myImg')
    
    SetUpUploader("#submitInput")
});

// main loop
async function main(url) {
    // Get title
    const hello = await getJson(urls.root, getOptions.typeApplication.json)
    document.getElementById("title").innerHTML = hello.message;

	// Get image    	
	const response = await getBlob(urls.plot_iris, getOptions.typeImage.png)        

	// Display image in tab image have id avatar
    convertBlobToImage(response, "avatar")

    // video
    const vresponse = await getBlob(urls.video, getOptions.typeApplication.mp4) 

    // Display video in tab vidoe have id myvideo and source mp4_src
    convertBlobToVideo(vresponse, "myvideo", "mp4_src")

}

// Calling that async function
main();

