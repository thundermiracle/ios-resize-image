export async function byFileReader(file: File): Promise<HTMLImageElement> {
  const img = new Image();
  await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (typeof e.target.result === 'string') img.src = e.target.result;
      resolve('');
    };
    reader.readAsDataURL(file);
  });

  return img;
}

export async function byCustomizeFileToImage(
  file: File,
): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);

  try {
    return await decodeImage(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function decodeImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
  const loaded = new Promise((resolve, reject) => {
    img.onload = () => resolve('');
    img.onerror = () => reject(Error('Image loading error.'));
  });

  if (img.decode) {
    await img.decode().catch(() => null);
  }

  await loaded;
  return img;
}
