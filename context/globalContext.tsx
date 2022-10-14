import React, { useReducer, useContext, useEffect } from "react";
import global_reducer from "../reducer/global_reducer";
import { ActionType } from "../ts/contexts/actions-types";
import { GlobalInitialState } from "../ts/contexts/initialStates";
import { LinkItemInt, ProfileDataInt } from "../ts/interfaces";
import { AvailableIcons } from "../components/icons";
import axios from "axios";

let reg =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

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
  isDeleting: boolean;
  isFormSubmitted: boolean;
  isDisabled: boolean;
  setData: (data: any) => void;
  closeModal: () => void;
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
  isFormSubmitted: false,
  isDeleting: false,
  isDisabled: false,
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
    // TODO Change Name EDITORCREATE
    dispatch({
      type: ActionType.TOGGLE_MODAL,
    });
    dispatch({
      type: ActionType.SELECTED_LINK_TYPE,
      payload: linkType,
    });
  };

  // FORM SUBMIT
  const handleFormSubmit = async (e: React.FormEvent) => {
    dispatch({
      type: ActionType.FORM_SUBMITTED,
    });
    e.preventDefault();

    if (!reg.test(state.selectedLink.url)) {
      console.log("error");
    }

    if (state.selectedLink.name && state.selectedLink.name.trim() !== "") {
      if (state.isEditing) {
        let body = {
          ...state.selectedLink,
        };
        try {
          let res = await axios.patch(
            `/api/links/${state.selectedLink._id}`,
            body
          );

          dispatch({
            type: ActionType.EDIT_ITEM,
            payload: res.data,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        let body = {
          ...state.selectedLink,
          type: state.linkType,
        };
        try {
          let res = await axios.post("/api/links", body);
          dispatch({
            type: ActionType.ADD_ITEM,
            payload: res.data,
          });
        } catch (error) {
          console.log(error);
        }
      }
      dispatch({
        type: ActionType.UPDATE_DATA_END,
      });

      dispatch({
        type: ActionType.TOGGLE_MODAL,
      });
    } else {
      // displayAlert("Please Enter Task", "danger");
    }
  };

  const deleteItem = async (id: string) => {
    dispatch({
      type: ActionType.DELETE_STARTED,
    });
    try {
      await axios.delete(`/api/links/${id}`);
      dispatch({
        type: ActionType.DELETE_ITEM,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: ActionType.UPDATE_DATA_END,
    });
  };

  const closeModal = () => {
    dispatch({
      type: ActionType.TOGGLE_MODAL,
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

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setData,
        deleteItem,
        selectItem,
        handleInputChange,
        handleFormSubmit,
        selectOrCreateItem,
        closeModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
