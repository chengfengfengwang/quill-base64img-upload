# quill-base64img-upload

A simple module for Quill v2 to upload img.

## How it works
It simply involves listening for Quill's image embed insert event and then uploading the base64 image. When you need to submit the Quill delta, replace the base64 image source with the URL of your uploaded image
## Install

```
npm install quill-base64img-upload
```
## How to use

```
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { Base64Uploader, getUploadedContents } from "quill-base64img-upload";
// @ts-ignore
Quill.register("modules/base64Uploader", Base64Uploader);
const quillInstance = new Quill("#container", {
  theme: "snow",
  modules: {
    toolbar: [["bold", "italic", "image"]],
    base64Uploader: {
      upload: async (blob:Blob) => {
        // do upload blob
        const uploadedUrl = await yourApi.upload({file: blob});
        return uploadedUrl
      },
    }
  },
});

document.getElementById("submit")?.addEventListener("click", function () {
  const result = getUploadedContents(quillInstance);
  // get replaced delta
  alert(JSON.stringify(result)); 
});
```
