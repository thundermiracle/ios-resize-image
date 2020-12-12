import React from 'react';
import styled from 'styled-components';

const ImageCanvasRoot = styled.div`
  width: 200px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 10px;
  background: #eee;
  position: relative;
  display: flex;
  justify-content: center;

  canvas {
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

type ImageCanvasProps = {
  image?: ImageBitmap;
};

const ImageCanvas = ({ image }: ImageCanvasProps): JSX.Element => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  if (image != null) {
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(image, image.width, image.height);
  }

  return (
    <ImageCanvasRoot>
      <canvas ref={canvasRef} />
      <div className="hint">No Image</div>
    </ImageCanvasRoot>
  );
};

export default ImageCanvas;
