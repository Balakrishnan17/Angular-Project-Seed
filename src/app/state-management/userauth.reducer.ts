import { UserAuth as State, UserAuthRecord } from "./userauth.model";
import { ActionList, LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE, AUTHORIZED, LOADING } from "./userauth.action";

export { State as AuthState };

export const initialState: State = new UserAuthRecord() as State;

export function AuthReducer(state = initialState, action: ActionList) {    
    switch (action.type) {
        case LOGIN:
            return {
                pending: false,
                is_logged_in: true,
                user_data: action.payload
            }

        case AUTHORIZED:
            return {
                pending: false,
                is_logged_in: true,
                user_data: action.payload
            }

        case LOADING:

            return {
                pending: true,
                is_logged_in: false
            }

        case LOGOUT:
            return {
                pending: false,
                is_logged_in: false,
                user_data: null
            }

        case LOGIN_SUCCESS:
            return {
                pending: false,
                is_logged_in: true,
                user_data: action.payload
            }

        case LOGIN_FAILURE:
            return {
                pending: false,
                is_logged_in: false,
                user_data: null
            }

        default:
            return state;
    }
}

export const getIsLoggedIn = (state: State) => state.is_logged_in;

export const getIsLoading = (state: State) => state.pending;

export const getUserData = (state: State) => state.user_data;

