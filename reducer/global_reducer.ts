import { Action } from "../ts/contexts/actions/global_actions";
import { ActionType } from "../ts/contexts/actions-types";
import { InitialState } from "../ts/contexts/initialStates";
import { LinkItemInt } from "../ts/interfaces";

const global_reducer = (state: InitialState, action: Action): InitialState => {
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
      console.log(state.linkType);

      return {
        ...state,
        profileData: {
          ...state.profileData,
          [state.linkType]: [...state.profileData[state.linkType], newLink],
        },
        isEditing: false,
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
      };
    case ActionType.DELETE_ITEM:
      const { profileData } = state;

      profileData[state.linkType] = state.profileData[state.linkType].filter(
        (item: LinkItemInt) => item.id !== action.payload
      );

      return {
        ...state,
        profileData,
      };

    default:
      return state;
  }
};

export default global_reducer;
