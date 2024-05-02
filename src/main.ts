import Quill from "quill"
interface Options {
  upload:(blob:Blob) => Promise<string>
}
const imgMap = new Map();

function base64ToBlob(base64:string):Promise<Blob> {
  return new Promise((resolve,_reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = function(){
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(function (blob) {
        resolve(blob!);
      },
      "image/webp",
      0.8)
    }
  })
}

export function Base64Uploader (quill:Quill,options:Options) {
  quill.on(Quill.events.EDITOR_CHANGE, async() => {
    const content = quill.getContents();
    for (const item of content.ops) {
      if (typeof item.insert === "object" && item.insert.image) {
        const dataUrl = item.insert.image as string;
        if (dataUrl.startsWith("data:image") && !imgMap.has(dataUrl)) {
          imgMap.set(item.insert.image, "");
          const blob = await base64ToBlob(dataUrl);
          options.upload(blob).then((res) => {
            imgMap.set(dataUrl, res);
          });
        }
      }
    }
  });
}
export const getUploadedContents = (quill:Quill) => {
  const contents = quill.getContents();
  for (const item of contents.ops) {
    if (typeof item.insert === "object" && item.insert.image) {
      if (
        typeof item.insert.image === "string" &&
        item.insert.image.startsWith("data:image")
      ) {
        const dataUrl = item.insert.image;
        if (imgMap.has(dataUrl)) {
          item.insert.image = imgMap.get(dataUrl);
        }
      }
    }
  }
  return contents;
};