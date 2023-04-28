import styles from "./Header.module.css";

interface Props {
  logo?: string;
  enableCompanyWebsite?: boolean;
  companyWebsite?: string;
}

export default function Header({
  logo,
  enableCompanyWebsite,
  companyWebsite,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <div className={styles.logo}>{logo && <img src={logo} alt="" />}</div>

        <ul className={styles.menuList}>
          <li className={styles.menuList}>
            <a href="#">채용공고</a>
          </li>
          <li className={styles.menuList}>
            <a href="#">FAQ</a>
          </li>
          {enableCompanyWebsite && companyWebsite && (
            <li>
              <a href={companyWebsite} className={styles.companyWebsite}>
                기업 사이트
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
