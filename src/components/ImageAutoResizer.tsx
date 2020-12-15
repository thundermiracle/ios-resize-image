import React from 'react';
import styled from 'styled-components';
import { resizeImageToDataUrl } from '../lib/resizeImage';

const ImageRoot = styled.div`
  width: 200px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 10px;
  background: #eee;
  position: relative;
  display: flex;
  justify-content: center;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .hint {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #555;
  }
`;

type ImageAutoResizerProps = {
  image?: ImageBitmap | HTMLImageElement;
  imageType?: string;
};

const ImageAutoResizer = ({
  image,
  imageType = 'image/jpeg',
}: ImageAutoResizerProps): JSX.Element => {
  return (
    <ImageRoot>
      <img
        src={image == null ? null : resizeImageToDataUrl(image, imageType)}
      />
      {image ? null : <div className="hint">No Image</div>}
    </ImageRoot>
  );
};

export default ImageAutoResizer;
