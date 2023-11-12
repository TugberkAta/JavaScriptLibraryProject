

export default function getAverageRGB(imgEl) {
  const blockSize = 5; // only visit every 5 pixels
  const defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting environments
  const canvas = document.createElement("canvas");
  const context = canvas.getContext && canvas.getContext("2d");
  let data;
  let i = -4;
  let length;
  const rgb = { r: 0, g: 0, b: 0 };
  let count = 0;

  if (!context) {
    return defaultRGB;
  }

  // Assign height and width separately
  canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, canvas.width, canvas.height);
  } catch (e) {
    console.error("Error in getting image data: ", e); // Improved error handling
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
}


