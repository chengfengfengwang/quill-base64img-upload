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
        console.log(blob);
        // do upload blob
        // api.upload({file: blob})
        return await "https://images.unsplash.com/photo-1713727660607-4bff18618098?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8";
      },
    }
  },
});

document.getElementById("submit")?.addEventListener("click", function () {
  const result = getUploadedContents(quillInstance);
  alert(JSON.stringify(result));
});
