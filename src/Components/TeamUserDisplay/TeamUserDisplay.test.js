import React from "react";
import TeamUserDisplay from "./TeamUserDisplay";
import { render, cleanup } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

const onChange = jest.fn();
afterEach(cleanup);

describe("TeamUserDisplay tests:", () => {
  it("renders user", async () => {
    const location = {
      pathname: "/1",
    };
    const fakeUser = {
      id: 1,
      displayName: "test user",
    };
    const fakeTeam = {
      id: 1,
      name: "test",
      teamMemberIds: [1],
    };
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.indexOf("users") > -1) {
        return Promise.resolve({
          json: () => Promise.resolve(fakeUser),
        });
      }

      if (url.indexOf("teams") > -1) {
        return Promise.resolve({
          json: () => Promise.resolve(fakeTeam),
        });
      }
    });

    const { queryByTestId } = render(<TeamUserDisplay location={location} />);
    expect(queryByTestId("DataRows")).toBeTruthy();

    const items = await screen.findByText(fakeUser.displayName);
    expect(items).toBeTruthy();
    global.fetch.mockRestore();
  });
});
