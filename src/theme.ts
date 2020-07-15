import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const palette: PaletteOptions = {
  primary: { main: "#1B5E20" },
  secondary: { main: "#0091EA" },
};

export const superpotagerTheme = responsiveFontSizes(
  createMuiTheme({
    palette,
  })
);
