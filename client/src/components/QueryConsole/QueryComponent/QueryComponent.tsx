import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import classes from "./QueryComponent.module.css";

import { getSavedQueries, getQuery, saveQuery } from "../../../API/api";

import { copiedToClipboard } from "../../../notifications/notifications";

interface QueryComponentProps {
  token: string;
}

type Query = {
  query_name: string;
  query_sql: string;
};

const QueryComponent: React.FC<QueryComponentProps> = ({ token }) => {
  const [query, setQuery] = useState("");
  const [savedQueries, setSavedQueries] = useState<Query[]>([]);

  const [output, setOutput] = useState<Array<any>>([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [queryName, setQueryName] = useState("");

  const queryInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const querySubmitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    getQuery(token, query).then((res) => {
      if (res == null) return;
      setOutput(res.data.result);
    });
  };

  const savedQueryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuery(e.target.value);
  };

  const queryNameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryName(e.target.value);
  };

  useEffect(() => {
    if (savedQueries.length > 0) return;
    getSavedQueries(token).then((res) => {
      setSavedQueries(res.data.queries);
    });
    // eslint-disable-next-line
  }, []);

  const handleSpanCopy = (e: any) => {
    navigator.clipboard.writeText(e.target.innerText);
    copiedToClipboard();
  };

  const clickSaveHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (!showNameInput) {
      return setShowNameInput(true);
    }
    saveQuery(token, { query_name: queryName, query_sql: query });
    setQueryName("");
    setShowNameInput(false);
    getSavedQueries(token).then((res) => {
      setSavedQueries(res.data.queries);
    });
    //axios post
  };

  return (
    <div className={classes.container}>
      <p id="tableinfo">
        Items:{" "}
        <span className={classes.canCopy} onClick={handleSpanCopy}>
          makerlab_item
        </span>
        , Entry Exit:{" "}
        <span className={classes.canCopy} onClick={handleSpanCopy}>
          makerlab_entryexit
        </span>
        , Users:{" "}
        <span className={classes.canCopy} onClick={handleSpanCopy}>
          makerlab_registereduser
        </span>
        , Used Machines:{" "}
        <span className={classes.canCopy} onClick={handleSpanCopy}>
          makerlab_inusemachine
        </span>
        , Supervisors:{" "}
        <span className={classes.canCopy} onClick={handleSpanCopy}>
          makerlab_supervisor
        </span>
      </p>
      {savedQueries.length > 0 ? (
        <select name="queries" id="queries" onChange={savedQueryHandler}>
          <option value="">None</option>
          {savedQueries.map((ele) => {
            return (
              <option key={ele.query_name} value={ele.query_sql}>
                {ele.query_name}
              </option>
            );
          })}
        </select>
      ) : null}
      <input
        type="text"
        value={`${query}`}
        className={classes.query}
        onChange={queryInputHandler}
      />
      <button onClick={querySubmitHandler}>Query</button>
      {showNameInput ? (
        <input
          type="text"
          value={`${queryName}`}
          className={classes.query}
          placeholder="Query Name"
          onChange={queryNameInputHandler}
        />
      ) : null}
      <button onClick={clickSaveHandler}>Save</button>
      {output.length > 0 ? (
        <div className={classes.output}>
          <table>
            <thead>
              <tr>
                {output[0].map((colName: any) => {
                  return <th key={colName}>{colName}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {output.slice(1).map((row: Array<any>, index) => {
                return (
                  <tr key={row[0] + index}>
                    {row.map((ele: any, sIndex) => {
                      return <td key={row[0] + sIndex}>{ele}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default QueryComponent;
