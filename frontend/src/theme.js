import { extendTheme } from "@chakra-ui/react";

const myTheme = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    600: "#2989d8",
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ myTheme });

export default theme;
