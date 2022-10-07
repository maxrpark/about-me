import React, { useReducer, useContext, useEffect, useState } from "react";
import user_theme_reducer from "../reducer/user_theme_reducer";
import { ActionType } from "../ts/contexts/actions-types";
import { UserThemeInitialState } from "../ts/contexts/initialStates/index";
import { ThemeProvider } from "styled-components";
import { themesList } from "../theme";
import axios from "axios";

type Props = {
  children: React.ReactNode;
};

enum ThemeColor {
  DEFAULT = "default",
  DARK = "dark",
  PINK = "pink",
  LIGHT = "light",
}

const themesColor = [
  { id: 1, name: ThemeColor.DEFAULT, color: "var(--theme-one-primary)" },
  { id: 2, name: ThemeColor.DARK, color: "var(--theme-two-primary)" },
  { id: 3, name: ThemeColor.PINK, color: "var(--theme-three-primary)" },
  { id: 4, name: ThemeColor.LIGHT, color: "var(--theme-four-primary)" },
];

const themesLayouts = [
  { id: 1, name: "default" },
  { id: 2, name: "minimalist" },
  { id: 3, name: "styles" },
];

interface UserContext {
  theme: string;
  layout: string;
  isSidebarOpen: boolean;
  themesColors: any;
  themesLayouts: any;
  updateData: boolean;
  setThemeData: (data: any) => void;
  toggleSidebar: () => void;
  saveChanges: () => void;
  changeThemeColor: (theme: string) => void;
  changeThemeLayout: (layout: string) => void;
}

const InitialState: UserThemeInitialState = {
  theme: ThemeColor.DEFAULT,
  layout: "default",
  isSidebarOpen: false,
  updateData: false,
  themesColors: themesColor,
  themesLayouts: themesLayouts,
};

const UserThemeContext = React.createContext({} as UserContext);
export const UserThemeProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    user_theme_reducer,
    InitialState as UserThemeInitialState
  );

  const setThemeData = (data: any) => {
    dispatch({
      type: ActionType.SET_THEME_DATA,
      payload: data,
    });
  };

  const toggleSidebar = () => {
    dispatch({
      type: ActionType.TOGGLE_SIDEBAR,
    });
  };

  const changeThemeColor = async (theme: string) => {
    dispatch({
      type: ActionType.CHANGE_THEME_COLOR,
      payload: theme,
    });
  };

  const changeThemeLayout = async (layout: string) => {
    dispatch({
      type: ActionType.CHANGE_THEME_LAYOUT,
      payload: layout,
    });
  };

  useEffect(() => {
    const body = document.querySelector("body")!;
    body.removeAttribute("class");
    document.querySelector("body")!.classList.add(state.layout);
  }, [state.layout]);

  const saveChanges = async () => {
    const { theme, layout } = state;
    dispatch({
      type: ActionType.TOGGLE_SIDEBAR,
    });
    try {
      await axios.patch(`/api/theme/`, { theme, layout });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserThemeContext.Provider
      value={{
        ...state,
        toggleSidebar,
        changeThemeColor,
        changeThemeLayout,
        setThemeData,
        saveChanges,
      }}
    >
      <ThemeProvider theme={themesList[state.theme]}>{children}</ThemeProvider>
    </UserThemeContext.Provider>
  );
};

export const useUserThemeContext = () => useContext(UserThemeContext);
