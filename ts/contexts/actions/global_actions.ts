import { ActionType } from "../actions-types";

export interface HandleFormInt {
    name: string;
    value: string;
    type: string;
}

interface SET_DATA {
    type: ActionType.SET_DATA;
    payload: any;
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
interface EDITING_ITEM {
    type: ActionType.EDITING_ITEM;
    payload: any;
}

interface ADD_ITEM {
    type: ActionType.ADD_ITEM;
    payload: any;
}
interface TOGGLE_MODAL {
    type: ActionType.TOGGLE_MODAL;
}

export type Action =
    | SET_DATA
    | DELETE_ITEM
    | HANDLE_FORM_INPUT
    | SELECT_ITEM
    | EDITING_ITEM
    | TOGGLE_MODAL
    | ADD_ITEM;
