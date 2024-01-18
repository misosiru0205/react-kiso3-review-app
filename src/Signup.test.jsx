/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "./Signup";

describe("Signup test", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );
  });

  test("test get textbox", () => {
    expect(screen.getAllByRole("textbox")).toBeTruthy(); //textboxの要素があるか検証
    screen.debug(screen.getAllByRole("textbox")); //textboxの要素を表示
  });

  test("test get password", () => {
    expect(screen.getAllByLabelText("パスワード")).toBeTruthy(); //lavelがパスワードの要素があるか検証
    screen.debug(screen.getAllByLabelText("パスワード")); //textboxの要素を表示
  });

  test("test get button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument(); //buttonの要素があるか検証
    screen.debug(screen.getByRole("button")); //buttonの要素を表示
  });
});
