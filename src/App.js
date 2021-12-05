import "./App.css";
import React, { useState } from "react";

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
  const closeModal = () => {
    setOpen(false);
    setSnack(false);
  };

  const [data, setData] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    workplace: "",
  });

  // Treść kodu html
  const [code, setCode] = useState(null);

  // Pokazywanie potwierdzenia kopiowania
  const [snack, setSnack] = useState(false);

  const handleCopySignature = (e) => {
    navigator.clipboard.writeText(code);
    setSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    setSnack(false);
  };

  return (
    <div className="App">
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
    </div>
  );
};

export default App;
