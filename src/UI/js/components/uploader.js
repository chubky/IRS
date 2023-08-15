import { uploadFile } from "../api/actions.js";
import { default as urls} from "../api/urls.js";

function handleOnClick(e){
    var fileInput = document.querySelector('input[type="file"]');
    const files = fileInput.files;
    uploadFile(urls.upload_file, files[0]);
    e.preventDefault();
}

function SetUpEventListener(submitInput){
    submitInput.addEventListener("click", event => handleOnClick(event));
}

function SetUpUploader(submitInputId){
    const submitInput = document.querySelector(submitInputId);

    SetUpEventListener(submitInput);
}





export {SetUpUploader}