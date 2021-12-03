import Button from '@mui/material/Button';

import { styled } from '@mui/styles';

const MyButtonWrapper = styled("div")({ 
    textAlign:"right",
  });

const MyButton = styled(Button)({ 
    fontFamily: "'IBM Plex Sans', sans-serif",
    background:"linear-gradient(to right, #f07d3b, #ea5036)",
    marginTop:30,
    marginBottom:30,
});

const Btn = ({icon, handle, name}) => {
    return(
        <MyButtonWrapper>
            <MyButton variant="contained" endIcon={icon} onClick={e => handle(e)}>
                {name}
            </MyButton>
        </MyButtonWrapper>
    )
}
export default Btn;
  