import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#5eb7ff", // Đổi màu chính của giao diện tại đây
          contrastText: "#fff",
        },
        secondary: {
          main: "#dcdde1",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#2f3640", // Đổi màu chính của giao diện tại đây
        },
        secondary: {
          main: "#353b48",
        },
      },
    },
  },
});

export default theme;
