import { render, screen } from "@testing-library/react";
import MainTitle from ".";
import userEvent from "@testing-library/user-event";

describe("MainTitle", () => {
  test("메인 텍스트를 변경할 수 있다.", async () => {
    const user = userEvent.setup();
    await render(<MainTitle />);
    const 헤딩1 = screen.getByRole("heading");
    await user.type(헤딩1, "즐겁게 성잘할 수 있도록");

    expect(헤딩1.innerHTML).toEqual("즐겁게 성잘할 수 있도록");
  });

  test("defaultValues가 있으면 초기값이 설정된다.", async () => {
    await render(
      <MainTitle defaultValues={{ heading: "default value 제목입니다." }} />
    );
    const 헤딩1 = screen.getByRole("heading");

    expect(헤딩1.innerHTML).toEqual("default value 제목입니다.");
  });

  test("값이 변경되면 onChange props를 호출한다.", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    await render(<MainTitle onChange={onChange} />);

    const 헤딩1 = screen.getByRole("heading");
    await user.type(헤딩1, "즐겁게 성잘할 수 있도록");
    await user.click(document.body);

    // TODO: backgroundImage 업로드  추가

    expect(onChange).toHaveBeenCalledWith({
      heading: "즐겁게 성잘할 수 있도록",
      backgroundImage: "",
      enable: true,
    });
  });

  test.todo("배경 이미지를 변경할 수 있다.");
});
