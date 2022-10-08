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
        (item: LinkItemInt) => item._id === action.payload
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

    case ActionType.FORM_SUBMITTED:
      return {
        ...state,
        isFormSubmitted: true,
        isDisabled: true,
      };

    case ActionType.ADD_ITEM:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          [state.linkType]: [
            ...state.profileData[state.linkType],
            action.payload,
          ],
        },
        isEditing: false,
      };
    case ActionType.EDIT_ITEM:
      let tempList = state.profileData[state.linkType].map(
        (item: LinkItemInt) => {
          if (item._id === state.selectedLink._id) {
            return action.payload;
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
      };
    case ActionType.DELETE_STARTED:
      return {
        ...state,
        isDeleting: true,
        isDisabled: true,
      };
    case ActionType.DELETE_ITEM:
      const { profileData } = state;
      profileData[state.linkType] = state.profileData[state.linkType].filter(
        (item: LinkItemInt) => item._id !== action.payload
      );

      return {
        ...state,
        profileData,
        showModal: false,
      };

    case ActionType.UPDATE_DATA_END:
      return {
        ...state,
        isDeleting: false,
        isFormSubmitted: false,
        isDisabled: false,
      };

    default:
      return state;
  }
};

export default global_reducer;
