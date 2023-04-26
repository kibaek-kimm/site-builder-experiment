import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import ImageUploader from ".";
import styles from "./ImageUploader.module.css";

// Mock FileReader
class MockFileReader {
  onloadend = () => {};

  readAsDataURL() {
    setTimeout(() => {
      this.onloadend();
    }, 50);
  }

  result = "data:image/png;base64,dummyBase64Data";
}

// @ts-ignore
const createMockFile = (fileName, size, type) => {
  const file = new File([new ArrayBuffer(size)], fileName, { type });
  return file;
};
const imageFile = createMockFile("dummy.png", 1024, "image/png");

describe("ImageUploader", () => {
  test("영역을 클릭하면 파일업로드 할 수 있다.", async () => {
    const onUploadedFile = jest.fn();
    render(<ImageUploader onUploadedFile={onUploadedFile} />);

    const 파일업로더_버튼 = screen.getByRole("button");

    await userEvent.click(파일업로더_버튼);
    onUploadedFile(imageFile);

    expect(onUploadedFile).toHaveBeenCalledWith(imageFile);
  });
  test.skip("파일선택 이후 선택한 이미지가 배경으로 투명하게 노출된다.", async () => {
    // @ts-ignore
    global.FileReader = MockFileReader;
    const onUploadedFile = jest.fn();
    render(<ImageUploader onUploadedFile={onUploadedFile} />);

    const 파일업로더_버튼 = screen.getByRole("button");

    await userEvent.click(파일업로더_버튼);
    onUploadedFile(imageFile);

    await waitFor(() => {
      const 프리뷰_이미지 = screen.getByRole("img");

      expect(프리뷰_이미지).toBeInTheDocument();
      expect(프리뷰_이미지.getAttribute("src")).toEqual(
        "data:image/png;base64,dummyBase64Data"
      );
    });
  });
  test("disclaimer를 추가할 수 있다.", () => {
    const { container } = render(
      <ImageUploader
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
  test.todo("파일선택 이후 재업로드하면 선택한 이미지가 변경된다.");
  test.todo("파일을 드래그해서 업로드 할 수 있다.");
});
