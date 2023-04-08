import { Box } from "@mui/material";

function LoadingScreen() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: "0",
        left: "0",
        display: "flex",
        alignItems: "center",
        justifContent: "center",
        background: " rgba(0, 0, 0, 0.4) ",
        zIndex: "1",
      }}
    >
      <Box
        sx={{
          width: "8vw",
          height: "8vw",
          position: "fixed",
          left: "46%",
          transform: "translate(-50%, -50%)",
          background: "transparent",
          borderRadius: "100%",
          border: "3px solid",
          borderColor: "black black black transparent",
          "@keyframes width-increase": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
          animation: "width-increase 1s ease infinite",
        }}
      ></Box>
    </Box>
  );
}

export default LoadingScreen;
