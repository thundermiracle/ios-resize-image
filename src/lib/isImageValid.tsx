/********************************************************************************
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓Check by Trying read file to Image object↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 ********************************************************************************/
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

/********************************************************************************
 * ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓Check by Image Type Pattern↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
 ********************************************************************************/
type ImageMimeTypePattern = {
  mime: string;
  pattern: number[];
};

// @see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
const imageMimeTypePatterns: ImageMimeTypePattern[] = [
  {
    mime: 'image/x-icon',
    pattern: [0x00, 0x00, 0x01, 0x00],
  },
  {
    mime: 'image/x-icon',
    pattern: [0x00, 0x00, 0x02, 0x00],
  },
  {
    mime: 'image/bmp',
    pattern: [0x42, 0x4d],
  },
  {
    mime: 'image/gif',
    pattern: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
  },
  {
    mime: 'image/gif',
    pattern: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
  },
  {
    mime: 'image/webp',
    // we'll skip null pattern from check because Pattern Mask is 0x00
    pattern: [
      0x52,
      0x49,
      0x46,
      0x46,
      null,
      null,
      null,
      null,
      0x57,
      0x45,
      0x42,
      0x50,
      0x56,
      0x50,
    ],
  },
  {
    mime: 'image/png',
    pattern: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  },
  {
    mime: 'image/jpeg',
    pattern: [0xff, 0xd8, 0xff],
  },
];

function getMimeTypeByBytes(bytes: Uint8Array): string {
  const matched = imageMimeTypePatterns.find(({ pattern }) =>
    // skip if pattern is null as Pattern Mask is 0x00
    pattern.every((p, ind) => p == null || bytes[ind] === p),
  );

  return matched?.mime || 'unknown type';
}

const minFileHeadBytesCount = Math.max(
  ...imageMimeTypePatterns.map(({ pattern }) => pattern.length),
);

export async function validateByPattern(file: File): Promise<boolean> {
  let fileHeadBytes: Uint8Array;

  await new Promise<void>((resolve) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (typeof e.target.result !== 'string')
        fileHeadBytes = new Uint8Array(e.target.result);
      resolve();
    };
    // only read necessary length of file header
    reader.readAsArrayBuffer(file.slice(0, minFileHeadBytesCount));
  });

  const mimeType = getMimeTypeByBytes(fileHeadBytes);

  // eslint-disable-next-line no-console
  console.log(`mime type is ${mimeType}`);

  return mimeType !== 'unknown type';
}
