import React, { useState } from "react";
import Axios from "axios"
import { Form, Col, Button, Card } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useAuth0()
  const username = user.name

  const navigate = useNavigate();

  const saveFile = (e) => {
    setSelectedImage(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const handleClick = async (event) => {
    const formData = new FormData();

    formData.append("username", username)
    formData.append("file", selectedImage)
    formData.append("fileName", fileName)
    formData.append("title", title)
    formData.append("location", location)
    formData.append("description", description)

    console.log(
      `username: ${username},
      file: ${selectedImage},
      fileName: ${fileName},
      title: ${title},
      location: ${location},
      description: ${description}
      `
    )

    try {
      const res = await Axios.post(
        "http://localhost:5000/upload",
        formData
      )
      console.log(res.data)
      if (res.data === "File has been uploaded.") {
        navigate("/success")
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div className="pic-upload">
      <Card body className="col d-flex justify-content-center" >
        {selectedImage && (
          <div>
          <img alt="not found" width={"750px"} src={URL.createObjectURL(selectedImage)} />
          <br />
          <br />
          <Button 
          variant="info"
          onClick={()=>setSelectedImage(null)}>
            Remove
          </Button>
          </div>
        )}
        <br />
      
        <br /> 
        <Form.Group as={Col} controlId="formGridName" className="contactForm">
          <Form.Control
            type="file"
            name="myImage"
            accept="image/png, image/jpeg"
            onChange={saveFile}
          />
        </Form.Group>
        <br />
        <Form.Group as={Col} controlId="formGridTitle" className="pic-title">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Title" 
              name="pic-title"
              onChange={(e) => setTitle(e.target.value)}
              />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLocation" className="pic-title">
            <Form.Label>Location</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="City, State, Country..." 
              name="pic-location"
              onChange={(e) => setLocation(e.target.value)}
              />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridContent" className="pic-content">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={5} 
              name="pic-content"
              onChange={(e) => setDescription(e.target.value)}
              />
        </Form.Group>
        <br />
        <Button  variant="info" type="submit" onClick={handleClick}>
          Submit
        </Button>
      </Card>
    </div>
      
  );
};

export default UploadAndDisplayImage;