import { render, screen, cleanup, act } from "@testing-library/react";
import ImageGallery2 from ".";
import userEvent from "@testing-library/user-event";

describe("ImageGallery2", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("제목을 수정할 수 있다", async () => {
    const user = userEvent.setup();
    render(<ImageGallery2 />);

    const 헤딩리스트 = screen.getAllByRole("heading");
    const 메인헤딩 = 헤딩리스트.find(
      ({ tagName }) => tagName === "H2"
    ) as HTMLElement;

    await user.type(메인헤딩, "Hello");

    expect(메인헤딩.innerHTML).toEqual("Hello");
  });

  test("기본적으로 복지 정보 카드 4개가 기본으로 생성된다.", async () => {
    render(<ImageGallery2 />);

    const 헤딩리스트 = screen.getAllByRole("heading");
    const 카드헤딩 = 헤딩리스트.filter(({ tagName }) => tagName === "H3");

    expect(카드헤딩).toHaveLength(4);
  });

  test("각 복지 카드의 정보를 수정할 수 있다.", async () => {
    const user = userEvent.setup();
    render(<ImageGallery2 />);

    const 헤딩리스트 = screen.getAllByRole("heading");
    const 카드헤딩 = 헤딩리스트.filter(
      ({ tagName }) => tagName === "H3"
    ) as HTMLElement[];
    const 카드_복지항목_리스트 = screen.getAllByRole("list") as HTMLElement[];

    await user.type(카드헤딩[0], "첫번째 복지");
    await user.type(카드_복지항목_리스트[0].children[0], "복지1-1");
    await user.type(카드_복지항목_리스트[0].children[0], "{enter}");
    await user.type(카드_복지항목_리스트[0].children[1], "복지1-2");

    await user.type(카드헤딩[3], "네번째 복지");
    await user.type(카드_복지항목_리스트[3].children[0], "복지4-1");
    await user.type(카드_복지항목_리스트[3].children[0], "{enter}");
    await user.type(카드_복지항목_리스트[3].children[1], "복지4-2");

    expect(카드헤딩[0].innerHTML).toEqual("첫번째 복지");
    expect(카드헤딩[3].innerHTML).toEqual("네번째 복지");

    expect(카드_복지항목_리스트[0].children[0].innerHTML).toEqual("복지1-1");
    expect(카드_복지항목_리스트[0].children[1].innerHTML).toEqual("복지1-2");
    expect(카드_복지항목_리스트[3].children[0].innerHTML).toEqual("복지4-1");
    expect(카드_복지항목_리스트[3].children[1].innerHTML).toEqual("복지4-2");
  });

  test("defaultValues가 있으면 초기값이 설정된다.", async () => {
    render(
      <ImageGallery2
        defaultValues={{
          enable: true,
          heading: "복지 타이틀 기본값",
          children: [
            {
              heading: "첫번째 복지",
              descriptions: ["복지1-1", "복지1-2"],
              image: "/img1.png",
            },
            {
              heading: "두번째 복지",
              descriptions: ["복지2-1", "복지2-2"],
              image: "/img2.png",
            },
            {
              heading: "세번째 복지",
              descriptions: ["복지3-1", "복지3-2"],
              image: "/img3.png",
            },
            {
              heading: "네번째 복지",
              descriptions: ["복지4-1", "복지4-2"],
              image: "/img4.png",
            },
          ],
        }}
      />
    );

    const 헤딩리스트 = screen.getAllByRole("heading");
    const 메인헤딩 = 헤딩리스트.find(
      ({ tagName }) => tagName === "H2"
    ) as HTMLElement;
    const 카드헤딩 = 헤딩리스트.filter(
      ({ tagName }) => tagName === "H3"
    ) as HTMLElement[];
    const 카드_복지항목_리스트 = screen.getAllByRole("list");
    const 이미지리스트 = screen.getAllByRole("img");
    const 이미지src리스트 = 이미지리스트.map((elem) =>
      elem.getAttribute("src")
    );

    expect(메인헤딩.innerHTML).toEqual("복지 타이틀 기본값");
    expect(카드헤딩[0].innerHTML).toEqual("첫번째 복지");
    expect(카드헤딩[1].innerHTML).toEqual("두번째 복지");
    expect(카드헤딩[2].innerHTML).toEqual("세번째 복지");
    expect(카드헤딩[3].innerHTML).toEqual("네번째 복지");

    expect(카드_복지항목_리스트[0].children[0].innerHTML).toEqual("복지1-1");
    expect(카드_복지항목_리스트[0].children[1].innerHTML).toEqual("복지1-2");
    expect(카드_복지항목_리스트[1].children[0].innerHTML).toEqual("복지2-1");
    expect(카드_복지항목_리스트[1].children[1].innerHTML).toEqual("복지2-2");
    expect(카드_복지항목_리스트[2].children[0].innerHTML).toEqual("복지3-1");
    expect(카드_복지항목_리스트[2].children[1].innerHTML).toEqual("복지3-2");
    expect(카드_복지항목_리스트[3].children[0].innerHTML).toEqual("복지4-1");
    expect(카드_복지항목_리스트[3].children[1].innerHTML).toEqual("복지4-2");

    expect(이미지src리스트).toEqual([
      "/img1.png",
      "/img2.png",
      "/img3.png",
      "/img4.png",
    ]);
  });

  /**
   * FIXME: "각 복지 카드의 정보를 수정할 수 있다." 테스트의 영향을 받아 엘리먼트의 실제값이 중복되어 추가된다.
            "descriptions": Array [
    -         "복지1-1",
    -         "복지1-2",
    +         "복지1-1복지1-1",
    +         "복지1-2복지1-2",
            ],
    -       "heading": "첫번째 복지",
    +       "heading": "첫번째 복지첫번째 복지",
   */
  test.skip("값이 변경되면 onChange props를 호출한다.", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<ImageGallery2 onChange={onChange} />);

    const 헤딩리스트 = screen.getAllByRole("heading");
    const 메인헤딩 = 헤딩리스트.find(
      ({ tagName }) => tagName === "H2"
    ) as HTMLElement;
    const 카드헤딩 = 헤딩리스트.filter(
      ({ tagName }) => tagName === "H3"
    ) as HTMLElement[];
    const 카드_복지항목_리스트 = screen.getAllByRole("list");

    await user.clear(메인헤딩);
    await user.type(메인헤딩, "복지 타이틀");

    await user.clear(카드헤딩[0]);
    await user.type(카드헤딩[0], "첫번째 복지");

    await user.clear(카드_복지항목_리스트[0].children[0]);
    await user.type(카드_복지항목_리스트[0].children[0], "복지1-1");
    await user.type(카드_복지항목_리스트[0].children[0], "{enter}");

    await user.clear(카드_복지항목_리스트[0].children[1]);
    await user.type(카드_복지항목_리스트[0].children[1], "복지1-2");

    await user.clear(카드헤딩[3]);
    await user.type(카드헤딩[3], "네번째 복지");

    await user.clear(카드_복지항목_리스트[3].children[0]);
    await user.type(카드_복지항목_리스트[3].children[0], "복지4-1");
    await user.type(카드_복지항목_리스트[3].children[0], "{enter}");
    await user.clear(카드_복지항목_리스트[3].children[1]);
    await user.type(카드_복지항목_리스트[3].children[1], "복지4-2");
    await user.click(document.body);

    expect(onChange).toHaveBeenLastCalledWith({
      heading: "복지 타이틀",
      children: [
        {
          heading: "첫번째 복지",
          descriptions: ["복지1-1", "복지1-2"],
          image: "",
        },
        {
          heading: "",
          image: "",
        },
        {
          heading: "",
          image: "",
        },
        {
          heading: "네번째 복지",
          descriptions: ["복지4-1", "복지4-2"],
          image: "",
        },
      ],
    });
  });
});
