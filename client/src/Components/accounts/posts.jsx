import React from "react";

  
export const Posts = () => {

  
  return (
      <div className="posts">
        <div className="header">
          <h1 id="posts">Posts</h1>
        </div>
        <div className="sort-post-dropdown">
          <label for="sort-by">Sort by:</label>

          <select name="sort-by" id="sort-by-dropdown">
            <option value="name-a">Name Ascending</option>
            <option value="name-d">Name Descending</option>
            <option value="date-a">Date Ascending</option>
            <option value="date-d">Date Descending</option>
          </select>
        </div>
      </div>      
  )
};
  