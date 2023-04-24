import { useEffect } from "react";

type OnClick = (event?: MouseEvent) => void;

/**
 * document 클릭 시 이벤트 처리 hooks
 *
 * 주의: 함께 사용하는 클릭이벤트가 있는경우 아래와 같이 이벤트 전파를 막아줘야 정상적으로 동작함
 *
 * ```
 * function handler(e) {
 *  e.stopPropagation();
 *  // code
 * }
 * ```
 * @param onClick
 */
export default function useDocumentClick(onClick: OnClick) {
  useEffect(() => {
    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);
}
