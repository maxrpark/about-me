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
  /* theme-one (default) */ 
  --theme-one-primary: #E3F2FD;
  --theme-one-primary-light: #FFFFFF;
  --theme-one-primary-dark: #85929C;

  /* theme-two */   /* (Black) */
  --theme-two-primary: #484848;
  --theme-two-primary-light: #FFFFFFCC;
  --theme-two-primary-dark: #212121;

  /* theme-three */   /* (pink) */
  --theme-three-primary: #FFEBEE;
  --theme-three-primary-light: #FFFBFF;
  --theme-three-primary-dark: #AF8EB5;

  /* theme-four */   /* (light) */
  --theme-four-primary: #E8F5E9;
  --theme-four-primary-light: #FBFBFB;
  --theme-four-primary-dark: #484848;


  /*  */
  --color-white-1: #ffffff;
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

.user-image {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}
`;
