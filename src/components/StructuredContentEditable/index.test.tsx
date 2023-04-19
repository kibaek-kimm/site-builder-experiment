import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StructuredContentEditable from ".";

const DEFAULT_PARENT_NODE = <ul style={{ width: "100px" }} />;
const DEFAULT_CHILD_NODE = <li />;

describe("StructuredContentEditable", () => {
  test("parentNode가 기본으로 생성된다.", () => {
    render(
      <StructuredContentEditable
        parentNode={DEFAULT_PARENT_NODE}
        childNode={DEFAULT_CHILD_NODE}
      />
    );

    const ul = screen.getByRole("list");

    expect(ul).toBeInTheDocument();
  });

  test("parentNode를 클릭하면 childNode가 생성된다.", async () => {
    const user = userEvent.setup();
    render(
      <StructuredContentEditable
        parentNode={DEFAULT_PARENT_NODE}
        childNode={DEFAULT_CHILD_NODE}
      />
    );

    const ul = screen.getByRole("list");

    await user.click(ul);

    const li = screen.getByRole("listitem");

    expect(ul).toBeInTheDocument();
    expect(li).toBeInTheDocument();
  });
  test("마지막 childNode에서 값을 입력 후 Enter를 치면 다음 childNode가 자동으로 추가된다.", async () => {
    const user = userEvent.setup();
    render(
      <StructuredContentEditable
        parentNode={DEFAULT_PARENT_NODE}
        childNode={DEFAULT_CHILD_NODE}
      />
    );

    const ul = screen.getByRole("list");

    await user.click(ul);

    const li = screen.getByRole("listitem");

    await user.type(li, "Hello");
    await user.type(li, "{enter}");

    const allLi = screen.getAllByRole("listitem");

    expect(allLi).toHaveLength(2);
  });
  test("마지막 childNode에서 값이 없는 상태에서 Enter를 치면 childNode가 자동으로 추가되지 않는다.", async () => {
    const user = userEvent.setup();
    render(
      <StructuredContentEditable
        parentNode={DEFAULT_PARENT_NODE}
        childNode={DEFAULT_CHILD_NODE}
      />
    );

    const ul = screen.getByRole("list");

    await user.click(ul);

    const li = screen.getByRole("listitem");

    await user.type(li, "{enter}");

    const allLi = screen.getAllByRole("listitem");

    expect(allLi).toHaveLength(1);
  });
  test.todo("빈 childNode에서 백스페이스를 누르면 해당 노드는 삭제된다.");
  test.todo(
    "첫번째 childNode에서 백스페이스를 눌렀을땐 해당 노드가 삭제되지 않는다."
  );
  test("defaultValue가 있으면 childNode가 만들어진다.", async () => {
    render(
      <StructuredContentEditable
        parentNode={DEFAULT_PARENT_NODE}
        childNode={DEFAULT_CHILD_NODE}
        defaultValue={["Hello", "World"]}
      />
    );

    const li = screen.getAllByRole("listitem");
    expect(li).toHaveLength(2);
  });
  test("값이 변경된 후 blur시, onChange props가 실행된다.", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(
      <StructuredContentEditable
        parentNode={DEFAULT_PARENT_NODE}
        childNode={DEFAULT_CHILD_NODE}
        onChange={onChange}
      />
    );

    const ul = screen.getByRole("list");
    await user.click(ul);

    const li = screen.getByRole("listitem");

    await user.type(li, "Hello");
    await user.type(li, "{enter}");

    const allLi = screen.getAllByRole("listitem");

    await user.type(allLi[1], "World");
    await user.click(document.body);

    expect(onChange).toHaveBeenLastCalledWith(["Hello", "World"]);
  });
});
