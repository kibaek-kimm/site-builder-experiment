import { HTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./SubTitle.module.css";

interface Props extends HTMLAttributes<HTMLElement> {
  children: string;
}

export default function SubTitle({ children, className, ...props }: Props) {
  return (
    <div className={classNames(styles.subTitle, className)} {...props}>
      {children}
    </div>
  );
}
