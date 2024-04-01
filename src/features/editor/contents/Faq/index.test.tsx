import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faq from ".";

describe("Faq", () => {
  test("FAQ를 입력할 수 있다.", async () => {
    render(<Faq />);

    const FAQ리스트 = screen.getByTestId("faq-list");

    const 질문 = FAQ리스트.querySelector(
      "div[contenteditable=true]"
    ) as HTMLElement;

    const 답변리스트 = FAQ리스트.querySelectorAll("ul");

    await userEvent.type(질문, "질문입니다.");
    await userEvent.type(답변리스트[0].children[0], "답변1 입니다.");
    await userEvent.type(답변리스트[0].children[0], "{enter}");
    await userEvent.type(답변리스트[0].children[1], "답변2 입니다.");

    expect(질문).toHaveTextContent("질문입니다.");
    expect(답변리스트[0].children[0]).toHaveTextContent("답변1 입니다.");
    expect(답변리스트[0].children[1]).toHaveTextContent("답변2 입니다.");
  });
  test("카드 개수를 설정 할 수 있다.", async () => {
    const { container } = render(<Faq />);
    const 루트 = container.firstChild as HTMLElement;

    await userEvent.click(루트);

    const 셀렉트박스 = screen.getByRole("combobox") as HTMLSelectElement;
    await userEvent.selectOptions(셀렉트박스, "3");

    const FAQ리스트 = screen.getByTestId("faq-list");

    expect(FAQ리스트.children.length).toEqual(3);
  });
  test("defaultValue가 있으면 초기값이 설정된다.", async () => {
    render(
      <Faq
        defaultValue={{
          enable: true,
          faqList: [
            {
              question: "질문1",
              answer: ["답변1-1", "답변1-2"],
            },
            {
              question: "질문2",
              answer: ["답변2-1", "답변2-2"],
            },
          ],
        }}
      />
    );

    const FAQ리스트 = screen.getByTestId("faq-list");
    const 질문리스트 = FAQ리스트.querySelectorAll(
      "div[contenteditable=true]"
    ) as NodeList;

    const 답변리스트 = FAQ리스트.querySelectorAll("ul");
    console.log("답변리스트:::: ", 답변리스트);

    expect(질문리스트[0]).toHaveTextContent("질문1");
    expect(Array.from(답변리스트[0].children)[0]).toHaveTextContent("답변1-1");
    expect(Array.from(답변리스트[0].children)[1]).toHaveTextContent("답변1-2");
    expect(질문리스트[1]).toHaveTextContent("질문2");
    expect(Array.from(답변리스트[1].children)[0]).toHaveTextContent("답변2-1");
    expect(Array.from(답변리스트[1].children)[1]).toHaveTextContent("답변2-2");
  });
  test("값이 변경되면 onChange props를 호출한다.", async () => {
    const onChange = jest.fn();
    render(<Faq onChange={onChange} />);

    const FAQ리스트 = screen.getByTestId("faq-list");

    const 질문 = FAQ리스트.querySelector(
      "div[contenteditable=true]"
    ) as HTMLElement;

    const 답변리스트 = FAQ리스트.querySelectorAll("ul");

    await userEvent.type(질문, "질문입니다.");
    await userEvent.type(답변리스트[0].children[0], "답변1 입니다.");
    await userEvent.type(답변리스트[0].children[0], "{enter}");
    await userEvent.type(답변리스트[0].children[1], "답변2 입니다.");
    await userEvent.click(document.body);

    expect(onChange).toHaveBeenLastCalledWith({
      enable: true,
      faqList: [
        {
          question: "질문입니다.",
          answer: ["답변1 입니다.", "답변2 입니다."],
        },
      ],
    });
  });
});
