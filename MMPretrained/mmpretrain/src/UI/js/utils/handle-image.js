function convertBlobToImage(blob, imageId){
    const blobURL = URL.createObjectURL(blob)
    const avatar = document.getElementById(imageId)
    avatar.style.display = "block"
    avatar.src = blobURL
}

function convertBlobToVideo(blob, videoId, sourceVideoId){
    const video = document.getElementById(sourceVideoId)
    const vblobURL = URL.createObjectURL(blob)

    video.src = vblobURL
    video.type = blob.type
    document.getElementById(videoId).load();
}

function previewUpdateImage(inputElementId, imageElementId){
    document.getElementById(inputElementId).addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.getElementById(imageElementId);
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }

            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
}

export {convertBlobToImage, 
        convertBlobToVideo, 
        previewUpdateImage}
