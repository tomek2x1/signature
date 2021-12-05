import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/styles";

import ModalFooter from "./ModalFooter";

const ShowModal = ({
  signHTML,
  closeModal,
  open,
  snack,
  handleCopySignature,
  handleCloseSnack,
}) => {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <ModalHeader id="modal-modal-title" variant="div" component="div">
          Kod stopki
        </ModalHeader>
        <ModalBody id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
            <pre style={pre}>{signHTML}</pre>
          </div>
        </ModalBody>
        <ModalFooter
          snack={snack}
          handleCopySignature={handleCopySignature}
          handleCloseSnack={handleCloseSnack}
        />
      </ModalBox>
    </Modal>
  );
};

const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  maxWidth: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #eaeced",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#fff",
  borderRadius: "20px",
  overflow: "hidden",
  padding: "30px",
  color: " #001f35",
  fontSize: 20,
  fontWeight: 600,
});

const ModalHeader = styled(Typography)({
  fontFamily: "'IBM Plex Sans', sans-serif",
  borderBottom: "1px solid #eaeced",
  paddingBottom: "10px",
  marginBottom: 0,
  color: "#ea5036",
});

const ModalBody = styled(Box)({
  overflowY: "scroll",
  maxHeight: "400px",
  marginTop: 0,
});

const pre = {
  fontSize: 10,
  wordWrap: "break-word",
  width: "100%",
};

export default ShowModal;
