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
  test.todo("카드를 수정할 수 있다.");
  test.todo("카드 개수를 설정 할 수 있다.");
  test.todo(
    "카드 입력 후 개수를 줄인후 다시 늘리면 기존에 입력한 카드데아터가 유지된다."
  );
  test.todo("defaultValue");
  test.todo("onChange");
});
