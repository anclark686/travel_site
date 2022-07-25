import React, { useState } from "react";
import Axios from "axios"
import { Form, Col, Button, Card } from 'react-bootstrap';

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = async (event) => {
    const pic = event.target.files[0]
    console.log(pic);
    setSelectedImage(pic);

    await Axios.post("http://localhost:5000/create", {
    file: pic
    })
  }

  

  return (
    <div className="pic-upload">
      <Card body className="col d-flex justify-content-center" >
        {selectedImage && (
          <div>
          <h4>Preview</h4>
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
            onChange={handleClick}
          />
          <br />
          <Button variant="info">Submit</Button>
        </Form.Group>
        <br />
        <Form.Group as={Col} controlId="formGridTitle" className="pic-title">
            <Form.Label for="pic-title">Title</Form.Label>
            <Form.Control type="text" placeholder="Title" name="pic-title"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridContent" className="pic-content">
            <Form.Label for="pic-content">Content</Form.Label>
            <Form.Control as="textarea" rows={5} name="pic-content"/>
        </Form.Group>
        <br />
        <Button  variant="info" type="submit">
          Submit
        </Button>
      </Card>
    </div>
      
  );
};

export default UploadAndDisplayImage;