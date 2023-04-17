import classNames from "classnames";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ContentEditable.module.css";

type ElementAttributes<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T];

interface BaseContentEditableProps {
  tagName: keyof JSX.IntrinsicElements;
  placeholder?: string;
  onInputChange?: (content: string) => void;
}

type ContentEditableProps<T extends keyof JSX.IntrinsicElements> =
  BaseContentEditableProps & ElementAttributes<T>;

export default function ContentEditable<T extends keyof JSX.IntrinsicElements>({
  tagName,
  placeholder,
  onInputChange,
  ...props
}: ContentEditableProps<T>) {
  const [content, setContent] = useState(placeholder ?? "");
  const elementRef = useRef<HTMLElement>(null);
  const element = useMemo(
    () =>
      React.createElement(tagName, {
        ...props,
        className: classNames(styles.wrapper, props.className),
        ref: elementRef,
        contentEditable: true,
        onBlur: (e: React.FormEvent<HTMLElement>) => {
          const target = e.target as HTMLElement;
          setContent(target.innerHTML);

          if (onInputChange) {
            onInputChange(target.innerHTML);
          }
        },
        dangerouslySetInnerHTML: { __html: content },
      }),
    [content, onInputChange, props, tagName]
  );

  useEffect(() => {
    if (elementRef && elementRef.current) {
      elementRef.current.innerHTML = content;
    }
  }, [content]);

  return element;
}
