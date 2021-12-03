import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Btn from './Btn';

const ModalFooter = ({code}) => {

    const handleCopyCode = e => {
        navigator.clipboard.writeText(code);
    }

    return(
        <Btn icon={<ContentCopyIcon/>}handle={handleCopyCode} name={"Kopiuj stopkę"}/>
    )
}
export default ModalFooter;