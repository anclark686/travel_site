import React from "react";

function Post({ username, title, location, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post_header">
        <h3>{title}</h3>
      </div>

      <img className="post_image" src={imageUrl} alt="" />

      <h4 className="post_text">
        <strong>{username} </strong> {location}
      </h4>
      <h5 className="post_text">{caption}</h5>
    </div>
  );
}

export default Post;
