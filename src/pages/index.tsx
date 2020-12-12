import React from 'react';

import styled from 'styled-components';

import Layout from '../components/Layout';
import ImageSelector from '../components/ImageSelector';
import ImageCanvas from '../components/ImageCanvas';

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
  // const [selectedFile, setSelectedFile] = React.useState<File>();

  const onFileSelected = (/*file: File*/) => {
    // setSelectedFile(file);
  };

  return (
    <Layout>
      <ImageSelector onFileSelected={onFileSelected} />
      <CanvasResult>
        <div className="image-wrapper">
          <code>FileReader.readAsDataURL</code>
          <ImageCanvas />
        </div>
        <div className="image-wrapper">
          <code>createImageBitmap</code>
          <ImageCanvas />
        </div>
        <div className="image-wrapper">
          <code>Customize blobToImage</code>
          <ImageCanvas />
        </div>
      </CanvasResult>
    </Layout>
  );
};

export default Home;
