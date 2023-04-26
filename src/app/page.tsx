"use client";

import styles from "./page.module.css";
import { useState } from "react";
import Main from "@/features/editor/contents/Main";
import { BuilderValues } from "@/types";
import ImageGallery2 from "@/features/editor/contents/ImageGallery2";
import RootLayout from "@/features/layout/RootLayout";
import Introduction from "@/features/editor/contents/Introduction";
import VideoContents from "@/features/editor/contents/VideoContents";

export default function Home() {
  const [builderValues, setBuilderValues] = useState<BuilderValues>({});

  const handleChange = (key, values) => {
    setBuilderValues((prevState) => ({
      ...prevState,
      [key]: values,
    }));
  };

  return (
    <RootLayout>
      <Main onChange={(values) => handleChange("main", values)} />
      <Introduction />
      <VideoContents />
      <ImageGallery2
        onChange={(values) => handleChange("imageGallery2", values)}
      />
      {/* <div className={styles.dataArea}>
        <pre>{JSON.stringify(builderValues, null, 4)}</pre>
      </div> */}
    </RootLayout>
  );
}
