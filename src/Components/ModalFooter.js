import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Btn from './Btn';


const ModalFooter = ({snack, handleCopySignature, handleCloseSnack}) => {

    return(
        <Btn icon={<ContentCopyIcon/>} handle={handleCopySignature} name={"Kopiuj stopkę"}/>
    )
}
export default ModalFooter;