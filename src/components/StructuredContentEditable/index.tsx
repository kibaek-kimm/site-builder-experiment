import {
  useRef,
  useState,
  KeyboardEvent,
  FormEvent,
  useEffect,
  cloneElement,
  ReactElement,
  FocusEvent,
} from "react";
import { useStructuredContentEditable } from "./hooks";

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

  return (
    <>
      {cloneElement(parentNode, {
        onClick: handleClick,
        children: items.map((item, index) =>
          cloneElement(childNode, {
            key: index,
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
