import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import styles from "./ImageUploaderList.module.css";
import classNames from "classnames";

interface Props extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  column?: number;
  disclaimer?: ReactNode;
}

export default function ImageUploaderList({
  children,
  column = 1,
  className,
  disclaimer,
  ...props
}: Props) {
  return (
    <div>
      <div
        className={classNames(styles.wrapper, className, {
          [styles.column2]: column === 2,
        })}
        {...props}
      >
        {children}
      </div>
      {disclaimer && <div className={styles.disclaimer}>{disclaimer}</div>}
    </div>
  );
}
