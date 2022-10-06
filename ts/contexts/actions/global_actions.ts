import { LinkItemInt, ProfileDataInt } from "../../interfaces";
import { ActionType } from "../actions-types";

export interface HandleFormInt {
  name: string;
  value: string;
  type: string;
}

interface selectedPayload {
  id: string;
  linkType: string;
}

interface SET_DATA {
  type: ActionType.SET_DATA;
  payload: ProfileDataInt;
}
interface DELETE_ITEM {
  type: ActionType.DELETE_ITEM;
  payload: string;
}
interface SELECT_ITEM {
  type: ActionType.SELECT_ITEM;
  payload: string;
}

interface HANDLE_FORM_INPUT {
  type: ActionType.HANDLE_FORM_INPUT;
  payload: HandleFormInt;
}
interface EDIT_ITEM {
  type: ActionType.EDIT_ITEM;
  payload: any; // TODO
}

interface ADD_ITEM {
  type: ActionType.ADD_ITEM;
  payload: any; // TODO
}
interface TOGGLE_MODAL {
  type: ActionType.TOGGLE_MODAL;
}
interface SELECTED_LINK_TYPE {
  type: ActionType.SELECTED_LINK_TYPE;
  payload: string;
}

interface UPDATE_DATA_END {
  type: ActionType.UPDATE_DATA_END;
}

export type Action =
  | SET_DATA
  | DELETE_ITEM
  | HANDLE_FORM_INPUT
  | SELECT_ITEM
  | EDIT_ITEM
  | TOGGLE_MODAL
  | SELECTED_LINK_TYPE
  | UPDATE_DATA_END
  | ADD_ITEM;
