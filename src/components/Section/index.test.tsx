import { render, screen, waitFor } from "@testing-library/react";
import Section from ".";
import userEvent from "@testing-library/user-event";
import styles from "./Section.module.css";

describe("Section", () => {
  test("Section을 클릭하면 활성화된다.", async () => {
    render(<Section data-testid="my-section" />);

    const 섹션 = await screen.findByTestId("my-section");

    await userEvent.click(섹션);

    expect(섹션).toHaveClass(styles.active);
  });

  test("Section의 우측 상단에 label이 표시된다. ", async () => {
    render(<Section data-testid="my-section" label="메인섹션" />);

    const 섹션 = screen.getByTestId("my-section");

    await userEvent.click(섹션);

    const 섹션라벨 = screen.getByTestId("section-label");

    expect(섹션라벨.innerHTML).toEqual("메인섹션");
  });

  test("Section을 클릭하면 가장 첫번째의 focusable한 요소가 자동 포커스된다.", async () => {
    render(
      <Section data-testid="my-section" label="메인섹션">
        <div contentEditable data-testid="focusable-element"></div>
        <input type="text" />
        <div contentEditable data-testid="focusable-element2"></div>
        <div contentEditable data-testid="focusable-element3"></div>
      </Section>
    );

    const 섹션 = screen.getByTestId("my-section");
    const 포커스가능한_자식요소 = screen.getByTestId("focusable-element");

    await userEvent.click(섹션);

    expect(포커스가능한_자식요소).toHaveFocus();
  });

  test("화면밖을 누르면 활성화가 해제된다.", async () => {
    render(<Section data-testid="my-section" label="메인섹션" />);

    const 섹션 = screen.getByTestId("my-section");
    await userEvent.click(섹션);
    await userEvent.click(document.body);

    expect(섹션).not.toHaveClass(styles.active);
  });

  test("다른 섹션을 선택하면 활성화가 해제된다.", async () => {
    render(
      <>
        <Section data-testid="section1" label="메인섹션" />
        <Section data-testid="section2" label="두번째섹션" />
      </>
    );

    const 섹션1 = screen.getByTestId("section1");
    const 섹션2 = screen.getByTestId("section2");
    await userEvent.click(섹션1);
    await userEvent.click(섹션2);

    waitFor(() => {
      expect(섹션1).not.toHaveClass(styles.active);
      expect(섹션2).toHaveClass(styles.active);
    });
  });

  test("활성화 시 onFocus props를 실행한다.", async () => {
    const onFocus = jest.fn();
    render(<Section data-testid="my-section" onFocus={onFocus} />);

    const 섹션 = await screen.findByTestId("my-section");

    await userEvent.click(섹션);

    expect(onFocus).toHaveBeenCalled();
  });
});
