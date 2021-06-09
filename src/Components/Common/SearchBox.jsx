import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="input-group flex-nowrap">
      <input
        autoFocus
        type="text"
        value={value}
        className="form-control"
        onChange={(e) => onChange(e.target.value)}
        data-testid="search-box"
        placeholder="Search"
        aria-describedby="addon-wrapping"
      />
    </div>
  );
};
export default SearchBox;
