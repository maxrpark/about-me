import { darkTheme } from "./themeColors/dark";
import { lightTheme } from "./themeColors/light";
import { defaultTheme } from "./themeColors/default";
import { pinkTheme } from "./themeColors/pink";
import { GlobalStyle } from "./themesConfig";

const themesList: any = {
  default: defaultTheme,
  dark: darkTheme,
  pink: pinkTheme,
  light: lightTheme,
};

export { themesList, GlobalStyle };
