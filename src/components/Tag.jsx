import React from "react";
import "./Tag.css";

const Tag = ({tagName, selectTag, selected}) => {
  // console.log("props", props)
  const tagStyle = {
    Personal: { backgroundColor: "#fda821" },
    Work: { backgroundColor: "#15d4c8" },
    Vacation: { backgroundColor: "#ffd12c" },
    Upskill: { backgroundColor: "#4cdafc" },
    default: { backgroundColor: "#f9f9f9" },
  };
  return (
    // eslint-disable-next-line react/prop-types
    <button
      type="button"
      className="tag"
      style={selected ? tagStyle[tagName] : tagStyle.default}
      onClick={() => selectTag(tagName)}>
      {tagName}
    </button>
  );
};

export default Tag;
