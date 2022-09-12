import { ActionType } from "../actions-types";

interface SET_DATA {
    type: ActionType.SET_DATA;
    payload: any;
}
interface DELETE_ITEM {
    type: ActionType.DELETE_ITEM;
    payload: string;
}

export type Action = SET_DATA | DELETE_ITEM;
