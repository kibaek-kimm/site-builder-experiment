import { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./ImageUploaderList.module.css";
import classNames from "classnames";

interface Props extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  column: number;
}

export default function ImageUploaderList({
  children,
  column = 1,
  className,
  ...props
}: Props) {
  return (
    <div
      className={classNames(styles.wrapper, className, {
        [styles.column2]: column === 2,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
