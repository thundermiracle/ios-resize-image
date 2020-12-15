/**
 * resize image's width&height to 50% and quality to 0.9
 * @param image
 * @param type
 * @param quality
 */
export async function resizeImageToBlob(
  image: ImageBitmap | HTMLImageElement,
  type: string,
  quality = 0.9,
): Promise<Blob> {
  const canvasDom = document.createElement('canvas');
  const ctx = canvasDom.getContext('2d');
  ctx.drawImage(image, 0, 0, image.height / 2, image.width / 2);

  const result = await new Promise<Blob>((resolve) => {
    canvasDom.toBlob(
      function bloblCallback(blob: Blob) {
        resolve(blob);
      },
      type,
      quality,
    );
  });

  return result;
}

export function resizeImageToDataUrl(
  image: ImageBitmap | HTMLImageElement,
  type: string,
  quality = 0.9,
): string {
  const canvasDom = document.createElement('canvas');
  const ctx = canvasDom.getContext('2d');

  canvasDom.width = image.width / 2;
  canvasDom.height = image.height / 2;
  ctx.drawImage(image, 0, 0, image.height / 2, image.width / 2);

  return canvasDom.toDataURL(type, quality);
}
