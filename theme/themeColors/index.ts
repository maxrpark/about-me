import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  bgColor: "var(--default-primary-light)",
  textColor: "var(--default-primary-dark)",
  buttonColor: "var(--default-primary)",
  textColorSecondary: "var(--default-primary-dark)",
};

const darkTheme: DefaultTheme = {
  bgColor: "var(--dark-primary)",
  textColor: "var(--dark-primary-light)",
  buttonColor: "var(--dark-primary-dark)",
  textColorSecondary: "var(--dark-primary-dark)",
};

const pinkTheme: DefaultTheme = {
  bgColor: "var(--pink-primary-light)",
  textColor: "var(--pink-primary-dark)",
  buttonColor: "var(--pink-primary)",
  textColorSecondary: "var(--pink-primary-dark)",
};

const lightTheme: DefaultTheme = {
  bgColor: "var(--light-primary-light)",
  textColor: "var(--light-primary-dark)",
  buttonColor: "var(--light-primary)",
  textColorSecondary: "var(--light-primary-dark)",
};

export const themesList: any = {
  default: defaultTheme,
  dark: darkTheme,
  pink: pinkTheme,
  light: lightTheme,
};
