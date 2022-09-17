import React, { useReducer, useContext, useEffect } from "react";
import user_theme_reducer from "../reducer/user_theme_reducer";
type Props = {
  children: React.ReactNode;
};

interface GlobalContext {
  theme: string;
}
interface UserThemeInitialState {
  theme: string;
}

const InitialState: UserThemeInitialState = {
  theme: "light",
};

const UserThemeContext = React.createContext({} as GlobalContext);

export const UserThemeProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    user_theme_reducer,
    InitialState as UserThemeInitialState
  );

  const max = () => {
    dispatch({
      type: "ActionType.SELECT_ITEM",
    });
  };
  return (
    <UserThemeContext.Provider value={{ ...state }}>
      {children}
    </UserThemeContext.Provider>
  );
};

export const useUserThemeContext = () => useContext(UserThemeContext);
