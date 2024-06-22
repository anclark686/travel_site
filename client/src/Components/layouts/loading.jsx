import React from "react";
import { Spinner, Button } from "react-bootstrap";

const Loading = () => {
  return (
    <div>
      <Button className="loading-button" variant="dark" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </div>
  );
};

export default Loading;
