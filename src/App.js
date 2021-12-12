import "./App.css";
import React, { useState, useEffect, useRef } from "react";

import { styled } from "@mui/styles";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";

import SignatureForm from "./Components/SignatureForm";
import ShowModal from "./Components/ShowModal";
import Loader from "./Components/Loader";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [image, setImage] = useState({ file: "" });

  const [data, setData] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    workplace: "",
    imageURL: "",
  });

  // Treść kodu html
  const [code, setCode] = useState(null);

  // Pokazywanie potwierdzenia kopiowania
  const [snack, setSnack] = useState(false);

  const handleCopySignature = (e) => {
    navigator.clipboard.writeText(code);
    setSnack(true);
  };

  const handleCloseSnack = (e) => {
    setSnack(false);
  };

  const closeModal = () => {
    setImage({ file: "" });
    setCode(false);
    setOpen(false);
    setSnack(false);
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (spinner === true) {
      setSpinner(false);
      setOpen(true);
    }
  }, [code]);

  return (
    <AppContainer>
      <Stack>
        <SignatureForm
          data={data}
          setData={setData}
          setCode={setCode}
          setOpen={setOpen}
          setSpinner={setSpinner}
          image={image}
          setImage={setImage}
        />
        {spinner ? <Loader /> : null}
        <ShowModal
          signHTML={code}
          closeModal={closeModal}
          open={open}
          snack={snack}
          handleCopySignature={handleCopySignature}
          handleClose={handleCloseSnack}
        />
        {snack ? (
          <Snackbar
            open={snack}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
          >
            <Alert onClose={handleCloseSnack} severity="success">
              Skopiowano
            </Alert>
          </Snackbar>
        ) : null}
      </Stack>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled("div")({
  position: "relative",
});
