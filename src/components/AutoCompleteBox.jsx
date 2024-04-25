import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../components/AutoCompleteBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function AutoCompleteBox() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedBody, setSelectedBody] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const changeHandler = (e) => {
    const userTyped = e.target.value;
    setInput(userTyped);
    if (userTyped.length > 0) {
      const filteredSuggestions = data.filter((post) =>
        post.title.toLowerCase().includes(userTyped.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setNotFound(filteredSuggestions.length === 0);
      setActiveIndex(-1);
      setSelectedTitle("");
      setSelectedBody("");
      setShowDropdown(filteredSuggestions.length > 0);
    } else {
      setSuggestions(data); // Show all titles when input is empty
      setNotFound(false);
      setSelectedTitle("");
      setSelectedBody("");
      setShowDropdown(true); // Keep the dropdown open
    }
  };

  const onSuggestionClick = (title, body) => {
    setInput(title);
    setSelectedTitle(title);
    setSelectedBody(body);
    setSuggestions([]);
    setActiveIndex(-1);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    if (!showDropdown) {
      setSuggestions(data); // Show all titles when toggling the dropdown
    }
    setShowDropdown(!showDropdown);
    setAnimate(!animate);
  };


  // --- Typing effect to body 

//   const typeEffect = document.querySelector(".selectedBody");
//   const text = { selectedBody };
//   function typingEffect(text, elementClass) {
//   const script = `
//     const text = "${text}";
//     const element = document.querySelector(".${elementClass}");
//     let i = 0;
//     function typeWriter() {
//         if (i < text.length) {
//             element.textContent += text.charAt(i);
//             i++;
//             setTimeout(typeWriter, 50);
//         }
//     }
//     typeWriter();
//   `;
//   return script;
// }

// // Call the function with the selectedBody text and the class name
// const typingEffectCode = typingEffect("Your selected body text here", "selectedBody");

// // Since we cannot execute JavaScript code here, the generated script should be used within the React component's useEffect hook.
// console.log(typingEffectCode);
  
  return (
    <div className={styles.container}>
      <div className={styles.githubButton}>
        <a
          target="_blank"
          href="https://github.com/ShirinAbdz/autocomplete-component"
        >
          Github Repo
        </a>
      </div>
      <div className={styles.input}>
        <textarea
          id="inputBox"
          className={styles.inputBox}
          value={input}

          placeholder="Search title..."
          onChange={changeHandler}
        />
        <label htmlFor="inputBox" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faAngleDown} />
        </label>
      </div>
      {(input.length > 0 || showDropdown) && (
        <div className={styles.searchResult}>
          <div className={styles.inputSection}>
            {notFound ? (
              <div className={styles.bodyText}>Not found</div>
            ) : (
              <ul>
                {suggestions.map((suggestion, id) => (
                  <li
                    key={id}
                    className={id === activeIndex ? styles.active : ""}
                    onClick={() =>
                      onSuggestionClick(suggestion.title, suggestion.body)
                    }
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {selectedBody && (
              <div>
                <h2 className={styles.bodySectionTitle}>Body</h2>
                <p className={styles.selectedBody}>{selectedBody}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AutoCompleteBox;
