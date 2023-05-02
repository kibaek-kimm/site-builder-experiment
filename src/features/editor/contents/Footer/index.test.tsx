import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from ".";

describe("Footer", () => {
  test("회사명을 변경할 수 있다.", async () => {
    render(<Footer />);
    const 회사명 = screen.getByRole("heading");

    await userEvent.type(회사명, "(주)회사명");

    expect(회사명).toHaveTextContent("(주)회사명");
  });

  test("회사의 정보를 변경할 수 있다.", async () => {
    render(<Footer />);
    const 회사정보 = screen.getByRole("company-information");

    await userEvent.type(
      회사정보,
      "사업자 등록번호 : 000-00-00000 | 대표 : 깈티드"
    );
    await userEvent.type(회사정보, "{enter}");
    await userEvent.type(
      회사정보,
      "06236 서울특별시 강남구 테헤란로 142, 12층 (역삼동, 아크플레이스)"
    );

    expect(회사정보).toHaveTextContent(
      "사업자 등록번호 : 000-00-00000 | 대표 : 깈티드 06236 서울특별시 강남구 테헤란로 142, 12층 (역삼동, 아크플레이스)"
    );
  });
  test("defaultValue가 있으면 초기값이 설정된다.", async () => {
    render(
      <Footer
        defaultValue={{
          companyName: "(주)테스트회사",
          companyInfo:
            "사업자 등록번호 : 000-00-00000 | 대표 : 깈티드 06236 서울특별시 강남구 테헤란로 142, 12층 (역삼동, 아크플레이스)",
        }}
      />
    );
    const 회사명 = screen.getByRole("heading");
    const 회사정보 = screen.getByRole("company-information");

    expect(회사명).toHaveTextContent("(주)테스트회사");
    expect(회사정보).toHaveTextContent(
      "사업자 등록번호 : 000-00-00000 | 대표 : 깈티드 06236 서울특별시 강남구 테헤란로 142, 12층 (역삼동, 아크플레이스)"
    );
  });

  test("값이 변경되면 onChange props를 호출한다.", async () => {
    const onChange = jest.fn();
    render(<Footer onChange={onChange} />);

    const 회사명 = screen.getByRole("heading");
    const 회사정보 = screen.getByRole("company-information");

    await userEvent.type(회사명, "(주)테스트회사");
    await userEvent.type(
      회사정보,
      "사업자 등록번호 : 000-00-00000 | 대표 : 깈티드"
    );
    await userEvent.type(회사정보, "{enter}");
    await userEvent.type(
      회사정보,
      "06236 서울특별시 강남구 테헤란로 142, 12층 (역삼동, 아크플레이스)"
    );
    await userEvent.tab();

    // await waitFor(() => {
    expect(onChange).toHaveBeenLastCalledWith({
      companyName: "(주)테스트회사",
      companyInfo: `사업자 등록번호 : 000-00-00000 | 대표 : 깈티드
06236 서울특별시 강남구 테헤란로 142, 12층 (역삼동, 아크플레이스)`,
    });
    // });
  });
});
