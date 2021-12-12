import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { styled } from "@mui/styles";

const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  background: "rgba(239, 239, 239, 0.9)",
  zIndex: 2,
});
