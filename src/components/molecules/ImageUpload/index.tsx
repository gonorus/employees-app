import './index.scss';

import { type HtmlHTMLAttributes, useRef, useState } from 'react';

interface ImageUploadProps {
  value?: string | null;
  onImageSelect: (base64: string | null) => void;
}

const MAX_FILE_SIZE = 500 * 1024;

const ImageUpload: React.FC<HtmlHTMLAttributes<HTMLInputElement> & ImageUploadProps> =
({ value = null, onImageSelect, ...props }) => {
  const [imageBase64, setImageBase64] = useState<string | null>(value);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }
    setImageBase64(null);
    onImageSelect(null);
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Error: Only image file type is allowed.');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Error: Maximum file size allowed is 500KB.');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageBase64(base64String);
      onImageSelect(base64String);
      setError(null);
    };
    reader.onerror = () => {
      setError('Error: reading file');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='inputWrapper'>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        {...props}
      />
      {imageBase64 && (
        <img
          src={imageBase64}
          alt="Image preview"
          className='imagePreview'
        />
      )}
      {error && <p className='errorMessage'>{error}</p>}
    </div>
  );
};

export default ImageUpload;
