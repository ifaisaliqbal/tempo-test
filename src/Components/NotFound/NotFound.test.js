import React from "react";
import NotFound from "./NotFound";
import { render, cleanup } from "@testing-library/react";
import { screen } from "@testing-library/dom";
afterEach(cleanup);

it("renders without crashing", () => {
  render(<NotFound />);
  const linkElement = screen.getByText(/Not Found/i);
  expect(linkElement).toBeInTheDocument();
});
