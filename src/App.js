import "./App.css";
import React, { useState, useEffect, useRef } from "react";

import { styled } from "@mui/styles";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";

import SignatureForm from "./Components/SignatureForm";
import ShowModal from "./Components/ShowModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    name: "",
    position: "",
    mobile: "",
    phone: "",
    email: "",
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
    if (code === false) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }, [code]);

  return (
    <AppContainer>
      <Stack>
        <SignatureForm
          data={data}
          setData={setData}
          setCode={setCode}
          setOpen={setOpen}
        />
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
