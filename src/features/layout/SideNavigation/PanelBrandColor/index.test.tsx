import { fireEvent, render, screen } from "@testing-library/react";
import PanelBrandColor from ".";
import userEvent from "@testing-library/user-event";

describe("SideNavigation/PanelBrandColor", () => {
  test("color버튼을 누르면 color picker로 색상을 선택할 수 있다.", async () => {
    render(<PanelBrandColor />);

    const 컬러버튼 = screen.getByTitle("컬러를 선택해주세요.");
    const 컬러인풋 = screen.getByDisplayValue(/#000000/i);

    await userEvent.click(컬러버튼);

    fireEvent.change(컬러인풋, { target: { value: "#123456" } });

    expect(컬러인풋).toHaveValue("#123456");
  });

  test('"적용" 버튼을 누르면 onChangeComplete props를 호출한다.', async () => {
    const onChangeComplete = jest.fn();
    render(<PanelBrandColor onChangeComplete={onChangeComplete} />);

    const 컬러버튼 = screen.getByTitle("컬러를 선택해주세요.");
    const 컬러인풋 = screen.getByDisplayValue(/#000000/i);
    const 적용버튼 = screen.getByRole("button", { name: "적용" });
    await userEvent.click(컬러버튼);

    fireEvent.change(컬러인풋, { target: { value: "#123456" } });

    await userEvent.click(적용버튼);

    expect(onChangeComplete).toHaveBeenLastCalledWith("#123456");
  });

  test("defaultValue를 적용할 수 있다.", () => {
    render(<PanelBrandColor defaultValue="#000" />);
    const 컬러_직접입력_인풋 = screen.getByRole("textbox");
    expect(컬러_직접입력_인풋).toHaveValue("#000");
  });

  test("색상을 직접 입력할 수 있다.", async () => {
    const onChangeComplete = jest.fn();
    render(<PanelBrandColor onChangeComplete={onChangeComplete} />);

    const 컬러_직접입력_인풋 = screen.getByRole("textbox");
    const 적용버튼 = screen.getByRole("button", { name: "적용" });
    await userEvent.type(컬러_직접입력_인풋, "#123456");
    await userEvent.click(적용버튼);

    expect(onChangeComplete).toHaveBeenLastCalledWith("#123456");
  });

  test("유효하지 않은 hex값인 경우 에러메세지가 노출된다.", async () => {
    const onChangeComplete = jest.fn();
    render(<PanelBrandColor onChangeComplete={onChangeComplete} />);

    const 컬러_직접입력_인풋 = screen.getByRole("textbox");
    const 적용버튼 = screen.getByRole("button", { name: "적용" });
    await userEvent.type(컬러_직접입력_인풋, "#######");
    await userEvent.click(적용버튼);

    const 에러메세지 = screen.queryByText("hex값이 유효하지 않습니다.");

    expect(onChangeComplete).not.toHaveBeenCalled();
    expect(에러메세지).toBeInTheDocument();
  });

  test("defaultValue가 유효하지 않은 hex값인 경우 적용되지 않고 에러메세지가 노춣한다.", () => {
    render(<PanelBrandColor defaultValue="#######" />);
    const 컬러_직접입력_인풋 = screen.getByRole("textbox");
    const 에러메세지 = screen.queryByText("hex값이 유효하지 않습니다.");
    expect(컬러_직접입력_인풋).not.toHaveValue("#######");
    expect(에러메세지).toBeInTheDocument();
  });
});
