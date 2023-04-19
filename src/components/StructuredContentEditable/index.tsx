import {
  KeyboardEvent,
  cloneElement,
  ReactElement,
  FocusEvent,
  useEffect,
} from "react";
import { useStructuredContentEditable } from "./hooks";
import ContentEditable from "../ContentEditable";

import styles from "./StructuredContentEditable.module.css";
import classNames from "classnames";

export interface StructuredContentEditableProps {
  parentNode: ReactElement;
  childNode: ReactElement;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
}

export default function StructuredContentEditable({
  parentNode,
  childNode,
  defaultValue,
  onChange,
}: StructuredContentEditableProps) {
  const {
    items,
    lastItemRef,
    handleClick,
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
    handleChange,
  } = useStructuredContentEditable({ defaultValue, onChange });

  useEffect(() => {
    if (childNode.type === ContentEditable) {
      console.warn("ContentEditable 컴포넌트는 정상 동작하지 않습니다.");
    }
  }, [childNode]);

  return (
    <>
      {cloneElement(parentNode, {
        onClick: handleClick,
        children: items.map((item, index) =>
          cloneElement(childNode, {
            key: index,
            className: classNames(styles.childNode, childNode.props.className),
            ref: index === items.length - 1 ? lastItemRef : null,
            suppressContentEditableWarning: true,
            contentEditable: true,
            onCompositionStart: handleCompositionStart,
            onCompositionEnd: handleCompositionEnd,
            onKeyDown: (e: KeyboardEvent<HTMLLIElement>) =>
              handleKeyDown(e, index),
            onBlur: (e: FocusEvent<HTMLLIElement, Element>) =>
              handleChange(e, index),
          })
        ),
      })}
    </>
  );
}
