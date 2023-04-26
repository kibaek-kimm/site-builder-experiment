import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Introduction from ".";

describe("Introduction", () => {
  test("제목/내용을 수정할 수 있다.", async () => {
    const user = userEvent.setup();
    const { container } = render(<Introduction />);

    const 헤딩 = screen.getByRole("heading");
    const 설명 = container.querySelector("p") as Element;

    await user.type(헤딩, "비전의 제목을 입력할 수 있습니다");
    await user.type(설명, "비전의 설명을 입력할 수 있습니다");

    expect(헤딩.innerHTML).toEqual("비전의 제목을 입력할 수 있습니다");
    expect(설명.innerHTML).toEqual("비전의 설명을 입력할 수 있습니다");
  });

  test("defaultValues가 있으면 초기값이 설정된다.", async () => {
    await render(
      <Introduction
        defaultValue={{
          heading: "default value 제목입니다",
          description: "default value 설명입니다",
          image: "dummy.png",
        }}
      />
    );
    const 헤딩 = screen.getByText("default value 제목입니다");
    const 설명 = screen.getByText("default value 설명입니다");
    const 이미지 = screen.getByRole("img");

    expect(헤딩).toBeInTheDocument();
    expect(설명).toBeInTheDocument();
    expect(이미지).toBeInTheDocument();
  });

  test("값이 변경되면 onChange props를 호출한다.", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    const { container } = await render(<Introduction onChange={onChange} />);

    const 헤딩 = screen.getByRole("heading");
    const 설명 = container.querySelector("p") as Element;

    await user.type(헤딩, "비전의 제목을 입력합니다.");
    await user.type(설명, "비전의 설명을 입력합니다.");
    await user.click(document.body);

    expect(onChange).toHaveBeenLastCalledWith({
      heading: "비전의 제목을 입력합니다.",
      description: "비전의 설명을 입력합니다.",
      image: "",
      enable: false,
    });
  });

  test.todo("배경 이미지를 변경할 수 있다.");
});
