import { render } from "@testing-library/react";
import styles from "./ImageUploaderList.module.css";
import ImageUploaderList from ".";

describe("", () => {
  test("disclaimer를 추가할 수 있다.", () => {
    const { container } = render(
      <ImageUploaderList
        disclaimer={
          <>
            파일 규격 jpg, png, gif
            <br />
            권장 최소 가로 크기 976px, 최대 이미지 크기 2M
          </>
        }
      />
    );

    const 디스클레이머 = Array.from(container.querySelectorAll("div")).find(
      (elem) => elem.classList.contains(styles.disclaimer)
    );

    expect(디스클레이머?.innerHTML).toEqual(
      "파일 규격 jpg, png, gif<br>권장 최소 가로 크기 976px, 최대 이미지 크기 2M"
    );
  });
});
