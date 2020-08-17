import React from "react";

const SearchBar = (props) => {
  return (
    <input
      onChange={(e) => props.getWord(e)}
      type="text"
      placeholder="Search..."
    />
  );
};

export default SearchBar;
