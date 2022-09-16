import React, { useReducer, useContext } from "react";
import global_reducer from "../reducer/global_reducer";
import { ActionType } from "../ts/contexts/actions-types";
import { InitialState } from "../ts/contexts/initialStates";
import { v4 as uuidv4 } from "uuid";
import { LinkItemInt, ProfileDataInt } from "../ts/interfaces";

import axios from "axios";
import { useEffect } from "react";

type Props = {
    children: React.ReactNode;
};

export interface HandleFormInt {
    name: string;
    value: string;
    type: string;
}

interface GlobalContext {
    name: string;
    profileData: ProfileDataInt;
    isEditing: boolean;
    showModal: boolean;
    selectedLink: LinkItemInt;

    setData: (data: any) => void;
    saveChanges: () => void;
    addNewItem: () => void;
    deleteItem: (data: string) => void;
    selectItem: (data: string) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFormSubmit: (e: React.FormEvent) => void;
}

const initialState: InitialState = {
    name: "cojer",
    profileData: [],
    isEditing: false,
    showModal: false,
    selectedLink: {
        id: "",
        name: "",
        url: "",
    },
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const payload: HandleFormInt = {
            name: e.target.name,
            value: e.target.value,
            type: e.target.id,
        };
        dispatch({
            type: ActionType.HANDLE_FORM_INPUT,
            payload,
        });
    };

    const addNewItem = () => {
        // Change Name
        dispatch({
            type: ActionType.TOGGLE_MODAL,
        });
    };

    // FORM SUBMIT
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (state.selectedLink.name && state.selectedLink.name.trim() !== "") {
            if (state.isEditing) {
                dispatch({
                    type: ActionType.EDITING_ITEM,
                    payload: state.selectedLink,
                });
                // displayAlert("Task Edited", "success");
            } else {
                dispatch({
                    type: ActionType.ADD_ITEM,
                    payload: uuidv4(),
                });
                // displayAlert("Task Added", "success");
            }
            dispatch({
                type: ActionType.TOGGLE_MODAL,
            });
        } else {
            // displayAlert("Please Enter Task", "danger");
        }
    };

    const deleteItem = (id: string) => {
        dispatch({
            type: ActionType.DELETE_ITEM,
            payload: id,
        });
    };

    const selectItem = (id: string) => {
        dispatch({
            type: ActionType.TOGGLE_MODAL,
        });
        dispatch({
            type: ActionType.SELECT_ITEM,
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

    useEffect(() => {
        saveChanges();
    }, [state.profileData]);

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                setData,
                deleteItem,
                selectItem,
                saveChanges,
                handleInputChange,
                handleFormSubmit,
                addNewItem,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
