"use client";

import styles from "./page.module.css";
import { useState } from "react";
import Main from "@/features/editor/contents/Main";
import { BuilderValues } from "@/types";
import ImageGallery2 from "@/features/editor/contents/ImageGallery2";
import RootLayout from "@/features/layout/RootLayout";
import Introduction from "@/features/editor/contents/Introduction";
import VideoContents from "@/features/editor/contents/VideoContents";
import ImageGallery1 from "@/features/editor/contents/ImageGallery1";
import HighlightCard from "@/features/editor/contents/HighlightCard";
import InterviewSlide from "@/features/editor/contents/InterviewSlide";
import Faq from "@/features/editor/contents/Faq";
import Header from "@/features/editor/contents/Header";
import useBuilderStore from "@/store";
import Footer from "@/features/editor/contents/Footer";

export default function Home() {
  const [builderValues, setBuilderValues] = useState<BuilderValues>({});
  const { setBuilderMetadata, logo, companyWebsite, enableCompanyWebsite } =
    useBuilderStore();

  const handleChange = (key, values) => {
    setBuilderValues((prevState) => ({
      ...prevState,
      [key]: values,
    }));
  };

  return (
    <RootLayout>
      <Header
        logo={logo}
        enableCompanyWebsite={enableCompanyWebsite}
        companyWebsite={companyWebsite}
      />
      <Main onChange={(values) => handleChange("main", values)} />
      <Introduction />
      <HighlightCard />
      <ImageGallery1 />
      <InterviewSlide />
      <VideoContents />
      <ImageGallery2
        onChange={(values) => handleChange("imageGallery2", values)}
      />
      <Faq />
      <Footer />
      {/* <div className={styles.dataArea}>
        <pre>{JSON.stringify(builderValues, null, 4)}</pre>
      </div> */}
    </RootLayout>
  );
}
