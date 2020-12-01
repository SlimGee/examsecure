import React from "react";
import { Alert, Row } from "react-bootstrap";

export default ({ show }) => {
  if (show) {
    return (
      <Row>
        <Alert variant="danger">
          There is an issue with your settings configuration. If you are running
          the front-end code from your local machine, you may need to follow{" "}
          <a
            href="https://rajrajhans.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            this guide
          </a>
          .
        </Alert>
      </Row>
    );
  }
  return "";
};