export function image2Base64(img: any) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL;
  }
}
