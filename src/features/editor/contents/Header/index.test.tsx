import useBuilderStore from "@/store";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import Header from ".";
import { screen } from "@testing-library/react";
import { act } from "@testing-library/react";

describe("Header", () => {
  test("로고가 있으면 로고를 노출한다.", () => {
    render(<Header logo="/logo.png" />);
    // const { result } = renderHook(() => useBuilderStore());

    // act(() => result.current.setBuilderMetadata({ logo: "/logo.png" }));

    const 로고 = screen.getByRole("img");

    expect(로고).toBeInTheDocument();
  });
  test("로고가 없으면 노출하지 않는다.", () => {
    render(<Header />);
    const 로고 = screen.queryByRole("img");
    expect(로고).not.toBeInTheDocument();
  });
  test("채용공고, FAQ메뉴는 고정으로 존재한다.", () => {
    render(<Header />);

    const 링크리스트 = screen.getAllByRole("link");

    expect(링크리스트[0].innerHTML).toEqual("채용공고");
    expect(링크리스트[1].innerHTML).toEqual("FAQ");
  });
  test('enableCompanyWebsite값이 true면 "기업 사이트" 메뉴가 노출된다.', () => {
    render(
      <Header enableCompanyWebsite companyWebsite="https://wanted.co.kr" />
    );

    const 링크 = screen.getByRole("link", { name: "기업 사이트" });

    expect(링크).toBeInTheDocument();
    expect(링크.getAttribute("href")).toEqual("https://wanted.co.kr");
  });
  test('enableCompanyWebsite값이 true나 companyWebsite가 없다면 "기업 사이트" 메뉴가 노출되지 않는다.', () => {
    render(<Header enableCompanyWebsite />);

    const 링크 = screen.queryByRole("link", { name: "기업 사이트" });

    expect(링크).not.toBeInTheDocument();
  });
});
