import React, { Fragment, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import gateway from "../../utils/gateway";

const AddFaceBox = ({
  setActiveSlide,
  activeSlide,
  currentUser,
  captureFrame,
}) => {
  const [isFaceAdded, setIsFaceAdded] = useState(false);

  useEffect(() => {
    if (activeSlide === 3 && isFaceAdded === false) {
      let b64ImageData = captureFrame();
      gateway
        .addIndexFace(b64ImageData, currentUser)
        .then(() => setIsFaceAdded(true));
    }
  }, [activeSlide]);

  return (
    <Fragment>
      <Alert variant={"info"} width={"500px"} className={"instructionsBox"}>
        <Alert.Heading className={"instrHeading"}>
          Let's add your Face
        </Alert.Heading>
        <ul className={"instructionsBoxList"}>
          <li>
            Please wait, our system is detecting and saving the features of your
            face.
          </li>
          <li>
            If any face other than the one being scanned now shows up in the
            frame during the test, an impersonation warning will be triggered.
          </li>
          <li>Ensure you do not wear any face covering.</li>
        </ul>
      </Alert>

      {isFaceAdded ? (
        <Button
          variant={"primary"}
          size={"lg"}
          className={"NextButton"}
          block
          onClick={() => setActiveSlide(4)}
        >
          Next
        </Button>
      ) : (
        <Button
          variant={"secondary"}
          disabled
          size={"lg"}
          className={"NextButton"}
          block
          onClick={() => {}}
        >
          Adding your face ...
        </Button>
      )}
    </Fragment>
  );
};

export default AddFaceBox;
