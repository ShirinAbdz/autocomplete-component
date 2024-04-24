import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../components/AutoCompleteBox.module.css";

function AutoCompleteBox() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error("Errod fetching data", error));
  }, []);

  const changeHandler = (e) => {
    const userTyped = e.target.value;
    setInput(userTyped);
    if (userTyped.length > 0) {
      const filteredSuggestions = data.filter((post) =>
        post.title.toLowerCase().includes(userTyped.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  const onSuggestionClick = (title) => {
    setInput(title);
    setSuggestions([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input
          type="text"
          value={input}
          placeholder="Search..."
          onChange={changeHandler}
        />
        <label htmlFor="">
          <img src="" alt="" />
        </label>
      </div>
      <div className={styles.searchResult}>
        <ul>
          {suggestions.map((suggestion, id) => (
            <li key={id} onClick={onSuggestionClick}>
              {suggestion.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AutoCompleteBox;
