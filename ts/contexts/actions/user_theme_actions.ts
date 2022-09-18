import { ActionType } from "../actions-types";

interface TOGGLE_SIDEBAR {
  type: ActionType.TOGGLE_SIDEBAR;
}
interface CHANGE_THEME_COLOR {
  type: ActionType.CHANGE_THEME_COLOR;
  payload: string;
}

export type Action = TOGGLE_SIDEBAR | CHANGE_THEME_COLOR;
