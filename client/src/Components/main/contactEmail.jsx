import { React, useState } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";

const initialFormData = Object.freeze({
  name: "",
  email: "",
  message: "",
});

export const FormPage = (props) => {
  const [formData, updateFormData] = useState(initialFormData);
  const [validated, setValidated] = useState(false);

  const sendFeedback = (serviceID, templateId, variables) => {
    window.emailjs
      .send(serviceID, templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      .catch((err) => console.error("There has been an Error.", err));
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const clearForm = (e) => {
    document.getElementById("formGridName").value = "";
    document.getElementById("formGridEmail").value = "";
    document.getElementById("contactMessage").value = "";
  };

  const handleSubmit = (e) => {
    // e.preventDefault()

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      alert(`Thanks for your message!`);
      const templateId = "template_199uw68";
      const serviceID = "service_6omd18s";
      sendFeedback(serviceID, templateId, {
        from_name: formData.name,
        message_html: formData.message,
        email: formData.email,
      });
      updateFormData(initialFormData);
      clearForm();
      setValidated(false);
    }
  };

  return (
    <div className="contactCard">
      <Card body className="col d-flex justify-content-center">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="formGridName" className="contactForm">
            <Form.Label>Name*</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="name"
              type="name"
              placeholder="Name"
              required
            />
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formGridEmail"
            className="contactForm"
          >
            <Form.Label>Email*</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group as={Col} id="formGridMessage" className="contactForm">
            <Form.Label>Message</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="message"
              as="textarea"
              rows={5}
              id="contactMessage"
              required
            />
          </Form.Group>

          <Button variant="info" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default FormPage;
