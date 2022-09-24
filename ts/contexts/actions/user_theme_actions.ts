import { ActionType } from "../actions-types";

interface SET_THEME_DATA {
  type: ActionType.SET_THEME_DATA;
  payload: any;
}
interface TOGGLE_SIDEBAR {
  type: ActionType.TOGGLE_SIDEBAR;
}
interface CHANGE_THEME_COLOR {
  type: ActionType.CHANGE_THEME_COLOR;
  payload: string;
}
interface CHANGE_THEME_LAYOUT {
  type: ActionType.CHANGE_THEME_LAYOUT;
  payload: string;
}

interface UPDATE_DATA_END {
  type: ActionType.UPDATE_DATA_END;
}

export type Action =
  | TOGGLE_SIDEBAR
  | CHANGE_THEME_COLOR
  | CHANGE_THEME_LAYOUT
  | UPDATE_DATA_END
  | SET_THEME_DATA;
