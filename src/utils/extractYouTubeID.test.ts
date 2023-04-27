import { extractYouTubeID } from "./extractYouTubeID";

describe("extractYouTubeID", () => {
  test("유투브 링크에서 youtubeId를 추출할 수 있다.", () => {
    const url = "https://www.youtube.com/watch?v=xRqPBkklonM";
    expect(extractYouTubeID(url)).toBe("xRqPBkklonM");
  });

  test("압축된 유투브 링크에서 youtubeId를 추출할 수 있다", () => {
    const url = "https://youtu.be/xRqPBkklonM";
    expect(extractYouTubeID(url)).toBe("xRqPBkklonM");
  });

  test("youtubeId만 입력하면 아이디값을 그대로 반환한다.", () => {
    const youtubeId = "xRqPBkklonM";
    expect(extractYouTubeID(youtubeId)).toBe("xRqPBkklonM");
  });

  test("유투브 링크가 아닌 경우 null을 반환한다.", () => {
    const url = "https://www.example.com/watch?v=invalidURL";
    expect(extractYouTubeID(url)).toBeNull();
  });

  test("유효하지 않은 url인 경우 null을 반환한다.", () => {
    const url = "This is not a URL";
    expect(extractYouTubeID(url)).toBeNull();
  });
});
