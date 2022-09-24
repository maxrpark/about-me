import React, { useReducer, useContext, useEffect } from "react";
import global_reducer from "../reducer/global_reducer";
import { ActionType } from "../ts/contexts/actions-types";
import { GlobalInitialState } from "../ts/contexts/initialStates";
import { v4 as uuidv4 } from "uuid";
import { LinkItemInt, ProfileDataInt } from "../ts/interfaces";
import { AvailableIcons } from "../components/icons";

import axios from "axios";

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
  linkType: string;
  availableIcons: any;
  setData: (data: any) => void;
  saveChanges: () => void;
  selectOrCreateItem: (linkType: string) => void;
  deleteItem: (id: string, linkType: string) => void;
  selectItem: (id: string, linkType: string) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

const initialState: GlobalInitialState = {
  name: "max",
  profileData: [],
  isEditing: false,
  showModal: false,
  availableIcons: AvailableIcons,
  linkType: "",
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
    initialState as GlobalInitialState
  );

  const setData = (data: any) => {
    dispatch({
      type: ActionType.SET_DATA,
      payload: data,
    });
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
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

  const selectOrCreateItem = (linkType: string) => {
    // Change Name
    dispatch({
      type: ActionType.TOGGLE_MODAL,
    });
    dispatch({
      type: ActionType.SELECTED_LINK_TYPE,
      payload: linkType,
    });
  };

  // FORM SUBMIT
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.selectedLink.name && state.selectedLink.name.trim() !== "") {
      if (state.isEditing) {
        dispatch({
          type: ActionType.EDIT_ITEM,
          payload: state.selectedLink,
        });
      } else {
        dispatch({
          type: ActionType.ADD_ITEM,
          payload: uuidv4(),
        });
      }

      dispatch({
        type: ActionType.TOGGLE_MODAL,
      });
    } else {
      // displayAlert("Please Enter Task", "danger");
    }
  };

  const deleteItem = (id: string, linkType: string) => {
    dispatch({
      type: ActionType.DELETE_ITEM,
      payload: id,
    });
  };

  const selectItem = (id: string, linkType: string) => {
    dispatch({
      type: ActionType.TOGGLE_MODAL,
    });

    dispatch({
      type: ActionType.SELECTED_LINK_TYPE,
      payload: linkType,
    });

    dispatch({
      type: ActionType.SELECT_ITEM,
      payload: id,
    });
  };

  const saveChanges = async () => {
    const body = {
      data: state.profileData,
      fileName: "db_about_me",
    };
    await fetch("/api/db", { method: "POST", body: JSON.stringify(body) });
  };

  useEffect(() => {
    if (state.profileData.links) {
      saveChanges();
    }
  }, [state.profileData[state.linkType]]);

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
        selectOrCreateItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
