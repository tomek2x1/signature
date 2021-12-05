import Button from "@mui/material/Button";

import { styled } from "@mui/styles";

const Btn = ({ icon, handle, name, type }) => {
  return (
    <MyButtonWrapper>
      <MyButton
        type={type}
        variant="contained"
        endIcon={icon}
        onClick={(e) => handle(e)}
      >
        {name}
      </MyButton>
    </MyButtonWrapper>
  );
};

const MyButtonWrapper = styled("div")({
  textAlign: "right",
});

const MyButton = styled(Button)({
  fontFamily: "'IBM Plex Sans', sans-serif",
  background: "linear-gradient(to right, #f07d3b, #ea5036)",
  marginTop: 30,
  marginBottom: 30,
});

export default Btn;
