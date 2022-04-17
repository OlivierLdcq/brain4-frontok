import React from "react";
import "./LinkForm.css";
import { InputGroup, FormControl, Button } from "react-bootstrap";
const LinkForm = ({ input, inputChanged, imageSubmit, url }) => {
  return (
    <div className="LinkForm mt-3">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter your url"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={url}
          onChange={inputChanged}
        />
        <Button
          variant=""
          style={{ backgroundColor: "#f44336" }}
          id="button-addon2"
          onClick={imageSubmit}
        >
          Analyse
        </Button>
      </InputGroup>
    </div>
  );
};

export default LinkForm;
