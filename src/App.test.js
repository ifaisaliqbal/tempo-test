import React from "react";
import { render, cleanup } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Teams/i);
  expect(linkElement).toBeInTheDocument();
});

const onChange = jest.fn();
afterEach(cleanup);

describe("TeamUserDisplay tests:", () => {
  it("renders user", async () => {
    const location = {
      pathname: "/1",
    };
    const allUsers = [
      {
        id: 1,
        displayName: "test user",
      },
    ];
    const fakeTeams = [
      {
        id: 1,
        name: "test",
        teamMemberIds: [1],
      },
    ];
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.indexOf("users") > -1) {
        return Promise.resolve({
          json: () => Promise.resolve(allUsers),
        });
      }

      if (url.indexOf("teams") > -1) {
        return Promise.resolve({
          json: () => Promise.resolve(fakeTeams),
        });
      }
    });

    const { queryByTestId } = render(<App />);
    expect(queryByTestId("DataRows")).toBeTruthy();

    const items = await screen.findByText(fakeTeams[0].name);
    expect(items).toBeTruthy();

    const buttons = await screen.findByText("View Members");
    expect(items).toBeTruthy();
    global.fetch.mockRestore();
  });
});
