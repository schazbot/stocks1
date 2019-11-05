import React from "react";

const SearchBar = props => {
  return (
    <div>
      <strong>Sort by:</strong>
      {props.sortTypes.map(sortType => (
        <label>
          <input
            type="radio"
            value={sortType}
            checked={props.currentSortType === sortType}
            onChange={e => props.changeSortType(e.target.value)}
          />
          {sortType}
        </label>
      ))}

      <br />

      <label>
        <strong>Filter:</strong>
        <select onChange={(e) => props.changeFilterType(e.target.value)}>
          {props.filterTypes.map(filterType => (
            <option value={filterType}>{filterType}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SearchBar;
