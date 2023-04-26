import { render, screen, cleanup, act } from "@testing-library/react";
import ImageGallery2 from ".";
import userEvent from "@testing-library/user-event";

describe("ImageGallery1", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("제목/소제목을을 수정할 수 있다", async () => {
    const user = userEvent.setup();
    render(<ImageGallery2 />);

    const 헤딩리스트 = screen.getAllByRole("heading");
    const 메인헤딩 = 헤딩리스트.find(
      ({ tagName }) => tagName === "H2"
    ) as HTMLElement;
    const 서브헤딩 = 헤딩리스트.find(
      ({ tagName }) => tagName === "H3"
    ) as HTMLElement;

    await user.type(메인헤딩, "Hello");
    await user.type(서브헤딩, "World");

    expect(메인헤딩.innerHTML).toEqual("Hello");
    expect(서브헤딩.innerHTML).toEqual("World");
  });

  test("이미지카드 6개가 기본으로 생성된다.", async () => {
    render(<ImageGallery2 />);

    const 카드리스트 = screen.getAllByRole("listitem");

    expect(카드리스트).toHaveLength(6);
  });

  test.skip("이미지를 업로드 할 수 있다.", async () => {
    const user = userEvent.setup();
    render(<ImageGallery2 />);

    const 이미지업로드_버튼 = screen.getAllByTitle("이미지 업로드");
    console.log(이미지업로드_버튼);
  });

  test.skip("defaultValues가 있으면 초기값이 설정된다.", async () => {
    render(
      <ImageGallery2
        defaultValues={{
          enable: true,
          heading: "복지 타이틀 기본값",
          imageList: [
            "/img1.png",
            "/img2.png",
            "/img3.png",
            "/img4.png",
            "/img5.png",
            "/img6.png",
          ],
        }}
      />
    );

    const 헤딩리스트 = screen.getAllByRole("heading");
    const 메인헤딩 = 헤딩리스트.find(
      ({ tagName }) => tagName === "H2"
    ) as HTMLElement;
    const 서브헤딩 = 헤딩리스트.filter(
      ({ tagName }) => tagName === "H3"
    ) as HTMLElement[];
    const 이미지리스트 = screen.getAllByRole("img");
    const 이미지src리스트 = 이미지리스트.map((elem) =>
      elem.getAttribute("src")
    );

    expect(메인헤딩.innerHTML).toEqual("복지 타이틀 기본값");
    expect(서브헤딩.innerHTML).toEqual("첫번째 복지");

    expect(이미지src리스트).toEqual([
      "/img1.png",
      "/img2.png",
      "/img3.png",
      "/img4.png",
      "/img5.png",
      "/img6.png",
    ]);
  });

  test.todo("값이 변경되면 onChange props를 호출한다.");
});
