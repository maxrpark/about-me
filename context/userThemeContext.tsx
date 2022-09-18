import React, { useReducer, useContext, useEffect } from "react";
import user_theme_reducer from "../reducer/user_theme_reducer";
import { ActionType } from "../ts/contexts/actions-types";
import { UserThemeInitialState } from "../ts/contexts/initialStates/index";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";

type Props = {
  children: React.ReactNode;
};

const themesColor = [
  { id: 1, name: "light" },
  { id: 1, name: "dark" },
];

interface UserContext {
  theme: string;
  isSidebarOpen: boolean;
  themesColors: any;
  toggleSidebar: () => void;
  changeThemeColor: (themeName: string) => void;
}

const InitialState: UserThemeInitialState = {
  theme: "light",
  isSidebarOpen: false,
  themesColors: themesColor,
};

const UserThemeContext = React.createContext({} as UserContext);

export const UserThemeProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    user_theme_reducer,
    InitialState as UserThemeInitialState
  );

  const toggleSidebar = () => {
    dispatch({
      type: ActionType.TOGGLE_SIDEBAR,
    });
  };

  const changeThemeColor = (themeName: string) => {
    dispatch({
      type: ActionType.CHANGE_THEME_COLOR,
      payload: themeName,
    });
  };
  return (
    <UserThemeContext.Provider
      value={{ ...state, toggleSidebar, changeThemeColor }}
    >
      <ThemeProvider theme={state.theme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </UserThemeContext.Provider>
  );
};

export const useUserThemeContext = () => useContext(UserThemeContext);
