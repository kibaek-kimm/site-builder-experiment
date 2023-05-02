import { validateHex } from "./helper";

describe("validateHex", () => {
  test("유효한 hex인 경우 true를 반환한다.", () => {
    expect(validateHex("000")).toBeTruthy();
    expect(validateHex("ff0000")).toBeTruthy();
    expect(validateHex("fff")).toBeTruthy();
    expect(validateHex("fFF")).toBeTruthy();
    expect(validateHex("3366FFCC")).toBeTruthy();
  });
  test("유효하지않은 hex인 경우 false를 반환한다.", () => {
    expect(validateHex("ZZZZZZ")).toBeFalsy();
    expect(validateHex("999GHH")).toBeFalsy();
    expect(validateHex("00")).toBeFalsy();
    expect(validateHex("dddd")).toBeFalsy();
    expect(validateHex("00ff")).toBeFalsy();
    expect(validateHex("00ff")).toBeFalsy();
    expect(validateHex("1")).toBeFalsy();
    expect(validateHex("##ffffff")).toBeFalsy();
  });
  test("유효하지 않은 값인 경우 false를 반환한다.", () => {
    expect(validateHex("")).toBeFalsy();
    expect(validateHex(undefined)).toBeFalsy();
    expect(validateHex(null)).toBeFalsy();
    expect(validateHex()).toBeFalsy();
  });
  test("맨 앞에 #은 있어도 된다.", () => {
    expect(validateHex("#ff0000")).toBeTruthy();
    expect(validateHex("ff0000")).toBeTruthy();
    expect(validateHex("#000")).toBeTruthy();
    expect(validateHex("000")).toBeTruthy();
    expect(validateHex("#3366FFCC")).toBeTruthy();
  });
});
