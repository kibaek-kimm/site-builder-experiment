import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Vision from "@/components/Vision";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Vision />
    </main>
  );
}
