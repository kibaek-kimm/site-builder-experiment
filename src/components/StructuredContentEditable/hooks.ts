import { useState, useRef, useEffect } from "react";
import { StructuredContentEditableProps } from ".";

interface Params
  extends Pick<
    StructuredContentEditableProps,
    "defaultValue" | "onChange" | "addChildItemIfEmpty"
  > {}

const useDefaultValue = ({
  defaultValue,
  addChildItemIfEmpty,
}: Omit<Params, "onChange">) => {
  if (defaultValue) {
    return defaultValue;
  }

  return addChildItemIfEmpty ? [""] : [];
};

export const useStructuredContentEditable = ({
  defaultValue: defaultValueProps,
  addChildItemIfEmpty,
  onChange,
}: Params) => {
  const defaultValue = useDefaultValue({
    defaultValue: defaultValueProps,
    addChildItemIfEmpty,
  });
  const [items, setItems] = useState<string[]>(defaultValue);
  const [itemAdded, setItemAdded] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const lastItemRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    if (items.length === 0) {
      setItems([""]);
      setItemAdded(true);
    }
  };

  const handleKeyDown = (e, index: number) => {
    const content = (e.target as Element).innerHTML;

    if (e.key === "Enter" && !isComposing && content) {
      e.preventDefault();

      if (index === items.length - 1) {
        setItems((prevState) => [...prevState, ""]);
        setItemAdded(true);
      }

      return;
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const handleChange = (e, index) => {
    const content = (e.target as HTMLElement).innerHTML;
    const newState = [...items];

    newState[index] = content;

    setItems(newState);

    if (onChange) {
      onChange(newState);
    }
  };

  useEffect(() => {
    if (itemAdded && lastItemRef.current) {
      lastItemRef.current.focus();
      setItemAdded(false);
    }
  }, [items, itemAdded]);

  return {
    items,
    lastItemRef,
    handleClick,
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
    handleChange,
  };
};
