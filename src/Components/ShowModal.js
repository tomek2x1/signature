import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const pre = {
  fontSize:10
};

const ShowModal = ({signHTML, closeModal, open}) => {
    return(
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Kod stopki
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <pre style={pre}>
              {signHTML}
              </pre>
            </div>
          </Typography>
        </Box>
      </Modal>
    )
}
export default ShowModal;