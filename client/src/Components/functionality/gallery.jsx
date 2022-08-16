import React, { useState } from "react";

  
export const Gallery = () => {
  const [image, setImage] = useState([])

  const getImages = async (req, res) => {
    
  }
  return (
    <div className="header">
      <h1 id="details">Gallery</h1>
      <button onClick={getImages} >Button</button>
      {image.map((val, key) => {
        return <div className="image" key={val.id}>
          <img src={val.path} alt={val.title} />
          <h4>{val.title}</h4>
          <p>{val.description}</p>
          </div>
      })}
    </div>
  );
};