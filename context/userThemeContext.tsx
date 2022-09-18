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
  { id: 2, name: "dark" },
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
  setThemeData: (data: any) => void;
  toggleSidebar: () => void;
  changeThemeColor: (themeName: string) => void;
  changeThemeLayout: (layoutName: string) => void;
}

const InitialState: UserThemeInitialState = {
  theme: "light",
  isSidebarOpen: false,
  themesColors: themesColor,
  themesLayouts: themesLayouts,
  layout: "default",
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

  const changeThemeColor = (themeName: string) => {
    dispatch({
      type: ActionType.CHANGE_THEME_COLOR,
      payload: themeName,
    });
  };

  const changeThemeLayout = (layoutName: string) => {
    dispatch({
      type: ActionType.CHANGE_THEME_LAYOUT,
      payload: layoutName,
    });
  };
  useEffect(() => {
    const body = document.querySelector("body")!;
    body.removeAttribute("class");
    document.querySelector("body")!.classList.add(state.layout);
  }, [state.layout]);
  return (
    <UserThemeContext.Provider
      value={{
        ...state,
        toggleSidebar,
        changeThemeColor,
        changeThemeLayout,
        setThemeData,
      }}
    >
      <ThemeProvider theme={state.theme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </UserThemeContext.Provider>
  );
};

export const useUserThemeContext = () => useContext(UserThemeContext);
