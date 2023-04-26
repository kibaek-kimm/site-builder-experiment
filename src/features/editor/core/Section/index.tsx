import classNames from "classnames";
import { HTMLAttributes, ReactNode, useRef, useState } from "react";
import styles from "./Section.module.css";
import { FOCUSABLE_SELECTORS } from "./constants";
import useDocumentClick from "@/hooks/useDocumentClick";

interface PropsParam {
  active: boolean;
}

type SectionChildren = ReactNode | ((props: PropsParam) => ReactNode);

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label?: string;
  children: SectionChildren;
  onFocus?: () => void;
}

export default function Section({ label, children, onFocus, ...props }: Props) {
  const [active, setActive] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useDocumentClick((event) => {
    if (
      sectionRef.current &&
      !sectionRef.current.contains(event?.target as Node)
    ) {
      setActive(false);
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (active) {
      return;
    }

    setActive(true);

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
      className={classNames(styles.wrapper, { [styles.active]: active })}
      onClick={handleClick}
    >
      {label && (
        <div className={styles.sectionLabel} data-testid="section-label">
          {label}
        </div>
      )}
      <div className={styles.section}>
        {typeof children === "function" ? (
          <>{children({ active })}</>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
