import { createGlobalStyle } from "styled-components";
import { minimalistLayout } from "./layouts/index";
// import { darkTheme, lightTheme } from "../theme";
declare module "styled-components" {
  export interface DefaultTheme {
    mainColor: string;
    secondaryColor: string;
    specialColor: string;
  }
}

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-white-1: #fff;
  --color-black-1: #1d1d1d;
  --btn-color: #5469d4;
  --border-radius-1: 5px;
  --border-radius-2: 10px;
  --box-shadow-1: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  --box-shadow-2: rgba(0, 0, 0, 0.2) 0px 6px 15px;
  --transition-1: all 0.3s ease-in-out;
  --primary-font-family: 'Poppins', sans-serif;

  --modal-background-light: rgba(0,0,0,0.5);
  --modal-background-dark: rgba(44, 44, 44, 0.726);

  /* theme */
  --backgroung-color: #eeebd0;
  --color-primary: #ffffff;
  --dark-background: #1d1d1d;
  --primary-white: #ffffff;

  --main-dark-color-1: #1d1d1d;
  --main-dark-color-2: #333333;
  --main-dark-color-3: #4d4d4d;

  --main-light-color-1: #eeebd0;
  --main-light-color-2: #f5f5f5;
  --main-light-color-3: #e5e5e5;

  --special-color-1: crimson;
  --special-color-2: crimson;

  --text-color-light-theme: #ffffff;
  --text-color-dark-theme: #918f8f;
}

body{
  background:${(props) => props.theme.mainColor};
}


${minimalistLayout}


`;
