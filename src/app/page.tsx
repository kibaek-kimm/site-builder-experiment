"use client";

import styles from "./page.module.css";
import Vision from "@/features/editor/contents/Vision";
import { useState } from "react";
import Main from "@/features/editor/contents/Main";
import { BuilderValues } from "@/types";
import Welfare from "@/features/editor/contents/Welfare";
import RootLayout from "@/features/layout/RootLayout";

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
      <div className={styles.editArea}>
        <Main onChange={(values) => handleChange("main", values)} />
        <Vision onChange={(values) => handleChange("vision", values)} />
        <Welfare onChange={(values) => handleChange("welfare", values)} />
      </div>
      {/* <div className={styles.dataArea}>
        <pre>{JSON.stringify(builderValues, null, 4)}</pre>
      </div> */}
    </RootLayout>
  );
}
