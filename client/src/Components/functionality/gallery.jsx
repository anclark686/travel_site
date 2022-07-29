import React, { useState } from "react";
import Axios from "axios"
  
export const Gallery = () => {
  const [image, setImage] = useState([])

  const getImages = async (req, res) => {
    
    try {
      const response = await Axios.get(
        "http://localhost:5000/gallery",
      )
      setImage(response.data)
      console.log(image)
    } catch (ex) {
      console.log(ex)
    }
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