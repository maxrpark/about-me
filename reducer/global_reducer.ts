import { Action } from "../ts/contexts/actions/global_actions";
import { ActionType } from "../ts/contexts/actions-types";
import { InitialState } from "../ts/contexts/initialStates";

const global_reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case ActionType.SET_DATA:
            return {
                ...state,
                profileData: action.payload,
            };
        case ActionType.DELETE_ITEM:
            const { profileData } = state;

            profileData.links = profileData.links.filter(
                (item: any) => item.id !== action.payload
            );

            return {
                ...state,
                ...profileData,
            };

        default:
            return state;
    }
};

export default global_reducer;
