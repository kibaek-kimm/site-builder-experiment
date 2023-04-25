import { render, screen, waitFor } from "@testing-library/react";
import PanelContent from ".";

describe("PanelContent", () => {
  test("children을 렌더링한다.", () => {
    render(
      <PanelContent>
        <h1>대제목</h1>
        <a href="https://wanted.co.kr">링크</a>
      </PanelContent>
    );

    const 헤딩 = screen.getByRole("heading");
    const 링크 = screen.getByRole("link");

    expect(헤딩).toBeInTheDocument();
    expect(링크).toBeInTheDocument();
  });
  test("subTitle이 있는 경우 렌더링한다.", () => {
    render(
      <PanelContent subTitle="이미지 패널">
        <h1>대제목</h1>
        <a href="https://wanted.co.kr">링크</a>
      </PanelContent>
    );
    const 패널헤딩 = screen.getByText("이미지 패널");

    expect(패널헤딩).toBeInTheDocument();
  });

  test("html element의 기본 속성을 확장할 수 있다.", async () => {
    render(
      <PanelContent
        subTitle="이미지 패널"
        data-testid="panel"
        id="my-panel"
        data-attribute-id="cusom__panel"
      >
        <h1>children</h1>
      </PanelContent>
    );

    const 루트 = screen.getByTestId("panel");

    expect(루트.getAttribute("id")).toEqual("my-panel");
    expect(루트.getAttribute("data-attribute-id")).toEqual("cusom__panel");
  });
});
