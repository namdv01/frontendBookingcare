import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

const MarkDown = (props) => {
  function handleEditorChange({ html, text }) {
    // console.log("handleEditorChange", html, text);
    props.onChangeMarkdown({ html, text });
  }

  return (
    <MdEditor
      style={{ height: "540px", border: "3px solid #ccc" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
      value={props.state.contentText}
    />
  );
};

export default MarkDown;
