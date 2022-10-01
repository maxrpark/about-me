import { createGlobalStyle } from "styled-components";
import { minimalistLayout } from "./layouts/index";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    buttonColor: string;
    textColorSecondary: string;
  }
}

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {




  /* theme colors */

  /* default */
  --default-primary: #E3F2FD;
  --default-primary-light: #FFFFFF;
  --default-primary-dark: #85929C;

  /* dark */
  --dark-primary: #484848;
  --dark-primary-light: #FFFFFFCC;
  --dark-primary-dark: #212121;

  /* pink */
  --pink-primary: #FFEBEE;
  --pink-primary-light: #FFFBFF;
  --pink-primary-dark: #AF8EB5;

  /* light */
  --light-primary: #E8F5E9;
  --light-primary-light: #FBFBFB;
  --light-primary-dark: #484848;


  /*  */
  --color-white-1: #fff;
  --color-black-1: #1d1d1d;

  --box-shadow-1: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  --box-shadow-2: rgba(0, 0, 0, 0.2) 0px 6px 15px;
  --transition-1: all 0.3s linear;



}

body{
  background:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
}
a{
    color:${(props) => props.theme.textColor};
}


${minimalistLayout}

svg{
 fill: ${(props) => props.theme.textColor};;
}
`;
