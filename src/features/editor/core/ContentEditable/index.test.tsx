import ContentEditable from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ContentEditable", () => {
  test("tagName의 태그로 contenteditable한 엘리먼트가 추가된다.", async () => {
    render(<ContentEditable tagName="h2" />);
    const 헤딩 = await screen.getByRole("heading");

    expect(헤딩).toHaveAttribute("contenteditable");
    expect(헤딩.tagName).toEqual("H2");
  });

  test("엘리먼트는 텍스트 입력이 가능하다.", async () => {
    const user = userEvent.setup();
    render(<ContentEditable tagName="h2" />);
    const 헤딩 = await screen.getByRole("heading");

    await user.type(헤딩, "Hello");

    expect(헤딩.innerHTML).toEqual("Hello");
  });

  test("값이 변경된 후 blur시, onInputChange props가 실행된다", async () => {
    const user = userEvent.setup();
    const onInputChange = jest.fn();
    render(<ContentEditable tagName="h2" onInputChange={onInputChange} />);
    const 헤딩 = await screen.getByRole("heading");

    await user.type(헤딩, "Hello");
    await user.click(document.body);

    expect(onInputChange).toHaveBeenCalledWith("Hello");
  });

  test("defaultValue가 있으면 초기값이 설정된다.", async () => {
    render(<ContentEditable tagName="h2" defaultValue="default value" />);
    const 헤딩 = await screen.getByRole("heading");
    expect(헤딩.innerHTML).toEqual("default value");
  });

  test.skip("placeholer가 있으면 값이 없는 경우에 노출한다.", async () => {
    // JSDOM에서 window.getComputedStyle를 지원하지 않아서 skip
    const { container } = render(
      <ContentEditable tagName="h2" placeholder="This is Placeholder" />
    );
    const 실제돔 = container.querySelector("h2");
    const pseudoElement = window.getComputedStyle(
      실제돔 as Element,
      "::before"
    );
    const pseudoContent = pseudoElement.content.replace(/['"]+/g, "");
    expect(pseudoContent).toBe("This is Placeholder");
  });
  test.skip("값이 없어지는 경우 placeholder를 노출한다.", () => {});
});
