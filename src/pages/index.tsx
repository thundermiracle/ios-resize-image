import React from 'react';

import styled from 'styled-components';

import Layout from '../components/Layout';
import ImageSelector from '../components/ImageSelector';
// import ImageCanvas from '../components/ImageCanvas';
import { byCustomizeFileToImage, byFileReader } from '../lib/FileToImage';
import ImageAutoResizer from '../components/ImageAutoResizer';

const CanvasResult = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  box-sizing: border-box;

  .image-wrapper {
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    font-size: 11px;
  }
`;

export const Home = (): JSX.Element => {
  const [fileName, setFileName] = React.useState<string>();
  const [fileType, setFileType] = React.useState<string>();
  const [
    imgByFileReader,
    setImgByFileReader,
  ] = React.useState<HTMLImageElement>();
  const [
    imgByCreateImageBitmap,
    setImgByCreateImageBitmap,
  ] = React.useState<ImageBitmap>();
  const [
    imgByFileToImage,
    setImgByFileToImage,
  ] = React.useState<HTMLImageElement>();

  const onFileSelected = async (file?: File) => {
    if (file == null) return;
    setFileName(file.name);
    setFileType(file.type);

    const img1 = await byFileReader(file);
    setImgByFileReader(img1);

    if (window.createImageBitmap) {
      const img2 = await createImageBitmap(file);
      setImgByCreateImageBitmap(img2);
    }

    const img3 = await byCustomizeFileToImage(file);
    setImgByFileToImage(img3);
  };

  return (
    <Layout>
      <ImageSelector onFileSelected={onFileSelected} fileName={fileName} />
      <CanvasResult>
        <div className="image-wrapper">
          <code>FileReader.readAsDataURL</code>
          {/* <ImageCanvas image={imgByFileReader} /> */}
          <ImageAutoResizer image={imgByFileReader} imageType={fileType} />
        </div>
        <div className="image-wrapper">
          <code>createImageBitmap</code>
          {/* <ImageCanvas image={imgByCreateImageBitmap} /> */}
          <ImageAutoResizer
            image={imgByCreateImageBitmap}
            imageType={fileType}
          />
        </div>
        <div className="image-wrapper">
          <code>Customize fileToImage</code>
          {/* <ImageCanvas image={imgByFileToImage} /> */}
          <ImageAutoResizer image={imgByFileToImage} imageType={fileType} />
        </div>
      </CanvasResult>
    </Layout>
  );
};

export default Home;
