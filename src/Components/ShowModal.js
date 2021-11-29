import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const ShowModal = ({signHTML, closeModal, modal}) => {
    return(
        <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
            {signHTML}
        </Box>
      </Modal>
    )
}
export default ShowModal;