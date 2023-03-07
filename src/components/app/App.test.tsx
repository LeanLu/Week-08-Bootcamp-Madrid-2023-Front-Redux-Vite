import { App } from "./App";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Given", () => {
  describe("When", () => {
    test("Then", () => {
      render(<App></App>);
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });
});
