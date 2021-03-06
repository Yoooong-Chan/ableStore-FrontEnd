import axios from "axios";
import React from "react";
import { useState } from "react";
import { BOARD_USER_API } from "../../Enum";

function CommentWrite({ boardId, categoryId, setRefreshComment }) {
  const TOKEN = sessionStorage.getItem("ACCESS_TOKEN");
  const [commentValue, setCommentValue] = useState("");

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setCommentValue("");
    const commentData = {
      content: commentValue,
    };

    fetch(`${BOARD_USER_API}/community/boards/${boardId}/comments`, {
      headers: {
        Authorization: TOKEN,
      },
      method: "POST",
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((res) => setRefreshComment(res));
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <br />
      <p> Replies </p>
      <hr style={{ border: "1px solid #d7dfe6" }} />
      <form style={{ display: "flex", justifyContent: "space-between" }} onSubmit={onSubmit}>
        <textarea
          style={{
            width: "100%",
            display: "block",
            padding: "0.6rem 1rem",
            fontSize: "1rem",
            lineHeight: "1.5",
            color: "#4c5861",
            backgroundColor: "#fff",
            backgroundClip: "padding-box",
            border: "1px solid #d7dfe6",
            borderRadius: "5px",
            resize: "none",
          }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
          onKeyPress={onKeyPress}
        ></textarea>
        <button
          style={{
            padding: "0.5rem 3rem",
            borderRadius: "3px",
            backgroundColor: "#0067e6",
            border: "1px solid transparent",
            lineHeight: "1.5",
            borderColor: "#0067e6",
            color: "#fff",
          }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommentWrite;
