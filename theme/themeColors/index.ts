import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  bgColor: "var(--theme-one-primary-light)",
  textColor: "var(--theme-one-primary-dark)",
  buttonColor: "var(--theme-one-primary)",
  textColorSecondary: "var(--theme-one-primary-dark)",
};

const darkTheme: DefaultTheme = {
  bgColor: "var(--theme-two-primary)",
  textColor: "var(--theme-two-primary-light)",
  buttonColor: "var(--theme-two-primary-dark)",
  textColorSecondary: "var(--theme-two-primary-dark)",
};

const pinkTheme: DefaultTheme = {
  bgColor: "var(--theme-three-primary-light)",
  textColor: "var(--theme-three-primary-dark)",
  buttonColor: "var(--theme-three-primary)",
  textColorSecondary: "var(--theme-three-primary-dark)",
};

const lightTheme: DefaultTheme = {
  bgColor: "var(--theme-four-primary-light)",
  textColor: "var(--theme-four-primary-dark)",
  buttonColor: "var(--theme-four-primary)",
  textColorSecondary: "var(--theme-four-primary-dark)",
};

export const themesList: any = {
  default: defaultTheme,
  dark: darkTheme,
  pink: pinkTheme,
  light: lightTheme,
};
