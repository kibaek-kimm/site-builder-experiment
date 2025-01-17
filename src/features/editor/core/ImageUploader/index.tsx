/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import styles from "./ImageUploader.module.css";

interface Props {
  defaultImage?: string;
  onUploadedFile?: (file: File) => void;
}

export default function ImageUploader({ defaultImage, onUploadedFile }: Props) {
  const [uploadedImage, setUploadedImage] = useState<string>(
    defaultImage ?? ""
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClickButton = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    const reader = new FileReader();

    if (files && files.length > 0) {
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(files[0]);

      if (onUploadedFile) {
        onUploadedFile(files[0]);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.uploadButton}
          onClick={handleClickButton}
          title="이미지 업로드"
        >
          <span>이미지 업로드</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          className={styles.hiddenInput}
          onChange={handleChange}
        />
      </div>

      {uploadedImage && (
        <div className={styles.preview}>
          <img src={uploadedImage} alt="" />
        </div>
      )}
    </div>
  );
}
