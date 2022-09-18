import { ActionType } from "../ts/contexts/actions-types";
import { Action } from "../ts/contexts/actions/user_theme_actions";
import { UserThemeInitialState } from "../ts/contexts/initialStates/index";

const user_theme_reducer = (
  state: UserThemeInitialState,
  action: Action
): UserThemeInitialState => {
  switch (action.type) {
    case ActionType.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case ActionType.CHANGE_THEME_COLOR:
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
};

export default user_theme_reducer;
