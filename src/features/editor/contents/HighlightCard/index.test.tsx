import { render, screen } from "@testing-library/react";
import HighlightCard from ".";
import userEvent from "@testing-library/user-event";

describe("HighlightCard", () => {
  test("제목을 수정할 수 있다.", async () => {
    render(<HighlightCard />);

    const 헤딩리스트 = screen.getAllByRole("heading");
    const 메인헤딩 = 헤딩리스트.find(
      ({ tagName }) => tagName === "H2"
    ) as HTMLElement;
    await userEvent.type(
      메인헤딩,
      "원티드는 오늘도 일의 미래를 만들어가고 있습니다"
    );

    expect(메인헤딩.innerHTML).toEqual(
      "원티드는 오늘도 일의 미래를 만들어가고 있습니다"
    );
  });
  test("카드 개수를 설정 할 수 있다.", async () => {
    const { container } = render(<HighlightCard />);
    const 루트 = container.firstChild as HTMLElement;

    await userEvent.click(루트);

    const 셀렉트박스 = screen.getByRole("combobox") as HTMLSelectElement;
    await userEvent.selectOptions(셀렉트박스, "3");

    const 카드리스트 = screen.getAllByRole("listitem");

    expect(카드리스트).toHaveLength(3);
  });
  test("카드를 수정할 수 있다.", async () => {
    render(<HighlightCard />);

    const 카드리스트 = screen.getAllByRole("listitem");

    await userEvent.type(카드리스트[0].children[0], "230만");
    await userEvent.type(카드리스트[0].children[1], "아시아 전역 유저");
    await userEvent.type(카드리스트[2].children[0], "1만 5천");
    await userEvent.type(카드리스트[2].children[1], "가입 기업 수");

    expect(카드리스트[0].children[0].innerHTML).toEqual("230만");
    expect(카드리스트[0].children[1].innerHTML).toEqual("아시아 전역 유저");
    expect(카드리스트[2].children[0].innerHTML).toEqual("1만 5천");
    expect(카드리스트[2].children[1].innerHTML).toEqual("가입 기업 수");
  });

  test("카드 입력 후 개수를 줄인후 다시 늘리면 기존에 입력한 카드데아터가 유지된다.", async () => {
    render(<HighlightCard />);

    const 카드리스트 = screen.getAllByRole("listitem");

    await userEvent.type(카드리스트[0].children[0], "230만");
    await userEvent.type(카드리스트[0].children[1], "아시아 전역 유저");
    await userEvent.type(카드리스트[4].children[0], "1만 5천");
    await userEvent.type(카드리스트[4].children[1], "가입 기업 수");

    const 셀렉트박스 = screen.getByRole("combobox") as HTMLSelectElement;
    await userEvent.selectOptions(셀렉트박스, "3");

    const 카드리스트_케이스2 = screen.getAllByRole("listitem");

    expect(카드리스트_케이스2[4]).toBeUndefined();

    await userEvent.selectOptions(셀렉트박스, "5");

    const 카드리스트_케이스3 = screen.getAllByRole("listitem");

    expect(카드리스트_케이스3[4]).not.toBeUndefined();
    expect(카드리스트_케이스3[4].children[0].innerHTML).toEqual("1만 5천");
    expect(카드리스트_케이스3[4].children[1].innerHTML).toEqual("가입 기업 수");
  });

  test("defaultValues가 있으면 초기값이 설정된다.", async () => {
    render(
      <HighlightCard
        defaultValue={{
          enable: true,
          heading: "원티드는 오늘도 일의 미래를 만들어가고 있습니다",
          cardList: [
            {
              title: "230만",
              description: "아시아 전역 유저",
            },
            {
              title: "",
              description: "",
            },
            {
              title: "300만",
              description: "누적 지원 수",
            },
          ],
        }}
      />
    );

    const 헤딩리스트 = screen.getAllByRole("heading");
    const 메인헤딩 = 헤딩리스트.find(
      ({ tagName }) => tagName === "H2"
    ) as HTMLElement;
    const 카드리스트 = screen.getAllByRole("listitem");

    expect(메인헤딩.innerHTML).toEqual(
      "원티드는 오늘도 일의 미래를 만들어가고 있습니다"
    );
    expect(카드리스트[0].children[0].innerHTML).toEqual("230만");
    expect(카드리스트[0].children[1].innerHTML).toEqual("아시아 전역 유저");
    expect(카드리스트[1].children[0].innerHTML).toEqual("");
    expect(카드리스트[1].children[1].innerHTML).toEqual("");
    expect(카드리스트[2].children[0].innerHTML).toEqual("300만");
    expect(카드리스트[2].children[1].innerHTML).toEqual("누적 지원 수");
  });

  // FIXME: array cleaning 해야하는 이슈 있음
  test.skip("값이 변경되면 onChange props를 호출한다", async () => {
    const onChange = jest.fn();
    render(<HighlightCard onChange={onChange} />);
    const 헤딩리스트 = screen.getAllByRole("heading");
    const 메인헤딩 = 헤딩리스트.find(
      ({ tagName }) => tagName === "H2"
    ) as HTMLElement;
    const 카드리스트 = screen.getAllByRole("listitem");

    await userEvent.type(메인헤딩, "미래를 만들어가고 있습니다");
    await userEvent.type(카드리스트[0].children[0], "230만");
    await userEvent.type(카드리스트[0].children[1], "아시아 전역 유저");
    await userEvent.type(카드리스트[2].children[0], "300만");
    await userEvent.type(카드리스트[2].children[1], "누적 지원 수");
    await userEvent.click(document.body);

    expect(onChange).toHaveBeenLastCalledWith({
      enable: true,
      heading: "미래를 만들어가고 있습니다",
      cardList: [
        {
          title: "230만",
          description: "아시아 전역 유저",
        },
        {
          title: "300만",
          description: "누적 지원 수",
        },
      ],
    });
  });
});
