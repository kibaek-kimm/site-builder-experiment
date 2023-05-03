import Link from "next/link";
import styles from "./GlobalNavigation.module.css";

export default function GlobalNavigation() {
  return (
    <header className={styles.gnb}>
      <Link href="/preview" target="_blank">
        <button>미리보기</button>
      </Link>
    </header>
  );
}
