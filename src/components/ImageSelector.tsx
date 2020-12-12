import React from 'react';
import styled from 'styled-components';

const SelectImageCanvas = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dotted grey;
  position: relative;
  transition: all 0.2s ease-out;

  &:hover {
    cursor: pointer;
    background: #eee;
  }

  .hint {
    position: absolute;
    color: #555;
    text-transform: uppercase;
  }

  input {
    display: none;
  }
`;

const imageFileTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];

type ImageSelectorProps = {
  hint?: string;
  onFileSelected: (f: File) => void;
};

const ImageSelector = ({
  hint = 'Select Your Image',
  onFileSelected,
}: ImageSelectorProps): JSX.Element => {
  const fileInputRef = React.useRef<HTMLInputElement>();

  const handleSelectFile = () => {
    const fileDom = fileInputRef.current;
    if (fileDom != null) {
      fileDom.click();
    }
  };

  const handleFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelected(event.target.files[0]);
  };

  return (
    <SelectImageCanvas onClick={handleSelectFile}>
      <div className="hint">{hint}</div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChanged}
        accept={imageFileTypes.join(',')}
      />
    </SelectImageCanvas>
  );
};

export default ImageSelector;
