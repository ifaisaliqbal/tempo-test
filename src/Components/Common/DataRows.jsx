import React from "react";
import { useHistory } from "react-router-dom";

export default function DataRows({
  data,
  idColumn = "id",
  displayProp,
  displayButton = true,
}) {
  const history = useHistory();
  return (
    <ul className="list-group" data-testid="DataRows">
      {data.map((item) => (
        <div key={item[idColumn]} to={`/${item[idColumn]}`}>
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={item[idColumn]}
          >
            {item[displayProp]}
            {displayButton && (
              <button
                className="btn btn-primary float-right"
                onClick={() => history.push(`/${item[idColumn]}`)}
                data-testid="DataRow-button"
              >
                View Members
              </button>
            )}
          </li>
        </div>
      ))}
    </ul>
  );
}
