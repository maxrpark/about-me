import { Action } from "../ts/contexts/actions/global_actions";
import { ActionType } from "../ts/contexts/actions-types";
import { GlobalInitialState } from "../ts/contexts/initialStates";
import { LinkItemInt } from "../ts/interfaces";

const global_reducer = (
  state: GlobalInitialState,
  action: Action
): GlobalInitialState => {
  switch (action.type) {
    case ActionType.SET_DATA:
      return {
        ...state,
        profileData: action.payload,
      };
    case ActionType.SELECTED_LINK_TYPE:
      return {
        ...state,
        linkType: action.payload,
        showModal: true,
      };
    case ActionType.TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
        linkType: "",
        selectedLink: {
          id: "",
          name: "",
          url: "",
        },
      };

    case ActionType.SELECT_ITEM:
      let selected = state.profileData[state.linkType].find(
        (item: LinkItemInt) => item.id === action.payload
      );

      return {
        ...state,
        isEditing: true,
        selectedLink: selected,
      };

    case ActionType.HANDLE_FORM_INPUT:
      const { name, value, type } = action.payload;

      //@ts-ignore
      let typeTempState = { ...state[type] };
      let updatedValues = {
        ...typeTempState,
        [name]: value,
      };

      return {
        ...state,
        [type]: updatedValues,
      };

    case ActionType.ADD_ITEM:
      const newLink = {
        ...state.selectedLink,
        id: action.payload,
      };

      return {
        ...state,
        profileData: {
          ...state.profileData,
          [state.linkType]: [...state.profileData[state.linkType], newLink],
        },
        isEditing: false,
        updateData: true,
      };
    case ActionType.EDIT_ITEM:
      let tempList = state.profileData[state.linkType].map(
        (item: LinkItemInt) => {
          if (item.id === state.selectedLink.id) {
            return state.selectedLink;
          }
          return item;
        }
      );

      let editedProfileData = {
        ...state.profileData,
        [state.linkType]: tempList,
      };
      return {
        ...state,
        profileData: editedProfileData,
        isEditing: false,
        updateData: true,
      };
    case ActionType.DELETE_ITEM:
      const { profileData } = state;
      profileData[state.linkType] = state.profileData[state.linkType].filter(
        (item: LinkItemInt) => item.id !== action.payload
      );

      return {
        ...state,
        profileData,
        updateData: true,
        showModal: false,
      };

    case ActionType.UPDATE_DATA_END:
      return {
        ...state,
        updateData: false,
      };

    default:
      return state;
  }
};

export default global_reducer;
