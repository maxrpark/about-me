import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    buttonColor: string;
    textColorSecondary: string;

    sidebarText: string;
  }
}

const defaultTheme: DefaultTheme = {
  bgColor: "var(--theme-one-primary-light)",
  textColor: "var(--theme-one-primary-dark)",
  buttonColor: "var(--theme-one-primary)",
  textColorSecondary: "var(--theme-one-primary-dark)",
  sidebarText: "var(--theme-one-primary-light)",
};

const darkTheme: DefaultTheme = {
  bgColor: "var(--theme-two-primary)",
  textColor: "var(--theme-two-primary-light)",
  buttonColor: "var(--theme-two-primary-dark)",
  textColorSecondary: "var(--theme-two-primary-dark)",
  sidebarText: "var(--theme-two-primary-light)",
};

const pinkTheme: DefaultTheme = {
  bgColor: "var(--theme-three-primary-light)",
  textColor: "var(--theme-three-primary-dark)",
  buttonColor: "var(--theme-three-primary)",
  textColorSecondary: "var(--theme-three-primary-dark)",
  sidebarText: "var(--theme-three-primary-light)",
};

const lightTheme: DefaultTheme = {
  bgColor: "var(--theme-four-primary-light)",
  textColor: "var(--theme-four-primary-dark)",
  buttonColor: "var(--theme-four-primary)",
  textColorSecondary: "var(--theme-four-primary-dark)",
  sidebarText: "var(--theme-four-primary-light)",
};

export const themesList: any = {
  default: defaultTheme,
  dark: darkTheme,
  pink: pinkTheme,
  light: lightTheme,
};
