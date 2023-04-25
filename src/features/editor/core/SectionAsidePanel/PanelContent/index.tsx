import { HTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./PanelContent.module.css";
import SubTitle from "../SubTitle";

interface Props extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  subTitle?: string;
}

export default function PanelContent({
  subTitle,
  children,
  className,
  ...props
}: Props) {
  return (
    <div className={classNames(styles.panelContent, className)} {...props}>
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      {children}
    </div>
  );
}
