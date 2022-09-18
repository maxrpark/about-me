import React, { useReducer, useContext, useEffect } from "react";
import user_theme_reducer from "../reducer/user_theme_reducer";
import { ActionType } from "../ts/contexts/actions-types";
import { UserThemeInitialState } from "../ts/contexts/initialStates/index";

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
  themesColor: any;
  toggleSidebar: () => void;
}

const InitialState: UserThemeInitialState = {
  theme: "light",
  isSidebarOpen: false,
  themesColor: themesColor,
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
  return (
    <UserThemeContext.Provider value={{ ...state, toggleSidebar }}>
      {children}
    </UserThemeContext.Provider>
  );
};

export const useUserThemeContext = () => useContext(UserThemeContext);
