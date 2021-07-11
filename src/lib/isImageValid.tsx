async function getFileDataURL(file: File): Promise<string> {
  let fileDataURL = '';
  await new Promise<void>((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (typeof e.target.result === 'string') fileDataURL = e.target.result;
      resolve();
    };
    reader.readAsDataURL(file);
  });

  return fileDataURL;
}

export async function validateByDecode(file: File): Promise<boolean> {
  const url = await getFileDataURL(file);

  const img = new Image();
  img.decoding = 'async';
  img.src = url;
  const tryDecodeImg = new Promise<boolean>((resolve) => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });

  if (img.decode) {
    await img.decode().catch(() => null);
  }

  const isValid = await tryDecodeImg;

  return isValid;
}
