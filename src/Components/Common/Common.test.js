import React from "react";
import SearchBox from "./SearchBox";
import DataRows from "./DataRows";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const onChange = jest.fn();
afterEach(cleanup);

describe("SearchBox tests:", () => {
  it("renders without crashing", () => {
    const { queryByTestId, queryByPlaceholderText } = render(
      <SearchBox onChange={onChange} />
    );

    expect(queryByTestId("search-box")).toBeTruthy();
  });

  it("Should call onChange", () => {
    const { queryByPlaceholderText } = render(
      <SearchBox onChange={onChange} />
    );

    const searchBox = queryByPlaceholderText("Search");
    fireEvent.change(searchBox, { target: { value: "test" } });
    expect(searchBox.value).toBe("test");
    expect(onChange).toHaveBeenCalled();
  });
});

describe("DataRows test: ", () => {
  it("renders without crashing", () => {
    const data = [{ id: 1, name: "a" }];
    const { queryByTestId } = render(
      <DataRows data={data} displayProp="name" onChange={onChange} />
    );
    expect(queryByTestId("DataRows")).toBeTruthy();
  });

  it("show have row with the data name", () => {
    const data = [{ id: 1, name: "Test1" }];
    const { queryByTestId } = render(
      <DataRows data={data} displayProp="name" onChange={onChange} />
    );
    expect(queryByTestId("DataRows")).toHaveTextContent("Test1");
  });

  it("should call history router", () => {
    const data = [{ id: 1, name: "Test1" }];
    const history = createMemoryHistory();

    const { queryByTestId } = render(
      <Router history={history}>
        <DataRows data={data} displayProp="name" onChange={onChange} />
      </Router>
    );
    fireEvent.click(queryByTestId("DataRow-button"));
    expect(history.length).toBe(2);
  });
});
