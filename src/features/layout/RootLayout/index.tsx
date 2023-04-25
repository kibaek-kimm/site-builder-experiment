import { PropsWithChildren } from "react";
import GlobalNavigation from "../GlobalNavigation";
import SideNavigation from "../SideNavigation";
import styles from "./RootLayout.module.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className={styles.root}>
      <GlobalNavigation />
      <div className={styles.wrapper}>
        <SideNavigation />
        <div className={styles.contents}>{children}</div>
      </div>
    </main>
  );
}
