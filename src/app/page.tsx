"use client";

import styles from "./page.module.css";
import { useState } from "react";
import MainTitle from "@/features/editor/contents/MainTitle";
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
  const {
    setBuilderMetadata,
    setBuilderContents,
    logo,
    companyWebsite,
    enableCompanyWebsite,
    contents,
  } = useBuilderStore();

  const handleChange = (key, values) => {
    setBuilderContents({
      [key]: values,
    });
  };

  return (
    <RootLayout>
      <Header
        logo={logo}
        enableCompanyWebsite={enableCompanyWebsite}
        companyWebsite={companyWebsite}
      />
      <MainTitle onChange={(values) => handleChange("mainTitle", values)} />
      <Introduction
        onChange={(values) => handleChange("introduction", values)}
      />
      <HighlightCard
        onChange={(values) => handleChange("highlightCard", values)}
      />
      <ImageGallery1
        onChange={(values) => handleChange("imageGallery1", values)}
      />
      <InterviewSlide
        onChange={(values) => handleChange("interviewSlide", values)}
      />
      <VideoContents
        onChange={(values) => handleChange("videoContents", values)}
      />
      <ImageGallery2
        onChange={(values) => handleChange("imageGallery2", values)}
      />
      <Faq onChange={(values) => handleChange("faq", values)} />
      <Footer />
      {/* <div className={styles.dataArea}>
        <pre>{JSON.stringify(builderValues, null, 4)}</pre>
      </div> */}
    </RootLayout>
  );
}
