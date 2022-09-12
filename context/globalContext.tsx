import React, { useReducer, useContext } from "react";
import global_reducer from "../reducer/global_reducer";
import { ActionType } from "../ts/contexts/actions-types";
import { InitialState } from "../ts/contexts/initialStates";
import axios from "axios";

type Props = {
    children: React.ReactNode;
};

interface GlobalContext {
    name: string;
    profileData: any;
    setData: (data: any) => void;
    saveChanges: () => void;
    deleteLink: (data: string) => void;
}

const initialState: InitialState = {
    name: "cojer",
    profileData: [],
};

const GlobalContext = React.createContext({} as GlobalContext);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(
        global_reducer,
        initialState as InitialState
    );

    const setData = (data: any) => {
        dispatch({
            type: ActionType.SET_DATA,
            payload: data,
        });
    };

    const deleteLink = (id: string) => {
        dispatch({
            type: ActionType.DELETE_ITEM,
            payload: id,
        });
    };

    const saveChanges = async () => {
        const res = await axios.post(
            "http://localhost:3000/api/db",
            state.profileData
        );
        console.log(res);
    };

    return (
        <GlobalContext.Provider
            value={{ ...state, setData, deleteLink, saveChanges }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
