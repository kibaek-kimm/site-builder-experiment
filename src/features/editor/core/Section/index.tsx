import classNames from "classnames";
import {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Section.module.css";
import { FOCUSABLE_SELECTORS } from "./constants";
import useDocumentClick from "@/hooks/useDocumentClick";

interface Props extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  label?: string;
  onFocus?: () => void;
}

export default function Section({ label, children, onFocus, ...props }: Props) {
  const [focus, setFocus] = useState<boolean>();
  const sectionRef = useRef<HTMLDivElement>(null);

  useDocumentClick((event) => {
    if (
      sectionRef.current &&
      !sectionRef.current.contains(event?.target as Node)
    ) {
      setFocus(false);
    }
  });

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (focus) {
      return;
    }

    setFocus(true);

    if (sectionRef.current) {
      const focusableElements = sectionRef.current.querySelectorAll(
        FOCUSABLE_SELECTORS.join(", ")
      );

      if (focusableElements.length > 0) {
        const firstFocusableElement = focusableElements[0] as HTMLElement;

        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }
    }

    if (onFocus) {
      onFocus();
    }
  };

  return (
    <div
      {...props}
      ref={sectionRef}
      className={classNames(styles.wrapper, { [styles.active]: focus })}
      onClick={handleClick}
    >
      {label && (
        <div className={styles.sectionLabel} data-testid="section-label">
          {label}
        </div>
      )}
      <div className={styles.section}>{children}</div>
    </div>
  );
}
