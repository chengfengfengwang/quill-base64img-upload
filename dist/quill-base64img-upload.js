import c from "quill";
const i = /* @__PURE__ */ new Map();
function g(o) {
  return new Promise((a, n) => {
    const t = new Image();
    t.src = o, t.onload = function() {
      const e = document.createElement("canvas");
      e.width = t.naturalWidth, e.height = t.naturalHeight, e.getContext("2d").drawImage(t, 0, 0, e.width, e.height), e.toBlob(
        function(s) {
          a(s);
        },
        "image/webp",
        0.8
      );
    };
  });
}
function f(o, a) {
  o.on(c.events.EDITOR_CHANGE, async () => {
    const n = o.getContents();
    for (const t of n.ops)
      if (typeof t.insert == "object" && t.insert.image) {
        const e = t.insert.image;
        if (e.startsWith("data:image") && !i.has(e)) {
          i.set(t.insert.image, "");
          const r = await g(e);
          a.upload(r).then((s) => {
            i.set(e, s);
          });
        }
      }
  });
}
const d = (o) => {
  const a = o.getContents();
  for (const n of a.ops)
    if (typeof n.insert == "object" && n.insert.image && typeof n.insert.image == "string" && n.insert.image.startsWith("data:image")) {
      const t = n.insert.image;
      i.has(t) && (n.insert.image = i.get(t));
    }
  return a;
};
export {
  f as Base64Uploader,
  d as getUploadedContents
};
