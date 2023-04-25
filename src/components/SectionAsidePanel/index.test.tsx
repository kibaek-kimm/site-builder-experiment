import { render, screen } from "@testing-library/react";
import SectionAsidePanel from ".";
import userEvent from "@testing-library/user-event";

describe("SectionAsidePanel", () => {
  test("Panel의 제목을 넣을 수 있다.", () => {
    render(<SectionAsidePanel {...DEFAULT_PROPS} />);
    const 패널제목 = screen.getByRole("heading");

    expect(패널제목.innerHTML).toEqual("패널 제목");
  });

  test("defaultEnabled props로 사용여부 값을 초기화 할 수 있다.", async () => {
    render(<SectionAsidePanel {...DEFAULT_PROPS} defaultEnabled={true} />);
    const 사용여부폼 = screen.getByRole("checkbox");

    expect(사용여부폼).toBeChecked();
  });

  test("사용여부를 변경하면 onChangeEnable props를 호출한다..", async () => {
    const onChangeEnable = jest.fn();
    render(
      <SectionAsidePanel {...DEFAULT_PROPS} onChangeEnable={onChangeEnable} />
    );
    const 사용여부폼 = screen.getByRole("checkbox");

    await userEvent.click(사용여부폼);

    expect(onChangeEnable).toHaveBeenCalled();
  });

  test("해당 섹션의 설명을 넣을 수 있다.", () => {
    render(<SectionAsidePanel {...DEFAULT_PROPS} />);
    const 패널설명 = screen.getByText("섹션에 대한 설명입니다");
    console.log(패널설명);

    expect(패널설명).toBeInTheDocument();
  });

  test("X클릭 시 onClose props를 호출한다.", async () => {
    const onClose = jest.fn();
    render(<SectionAsidePanel {...DEFAULT_PROPS} onClose={onClose} />);
    const 닫기버튼 = screen.getByRole("button", { name: "닫기" });

    await userEvent.click(닫기버튼);

    expect(onClose).toHaveBeenCalled();
  });
});

const DEFAULT_PROPS = {
  title: "패널 제목",
  description: "섹션에 대한 설명입니다.",
  defeaultEnable: false,
  onClose: () => {},
  onChangeEnable: () => {},
};
