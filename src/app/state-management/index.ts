import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as userAuthRed from './userauth.reducer';

export interface AuthState {
    status: userAuthRed.AuthState;
}

export interface State {
    auth: AuthState;
}

export const reducers = {
    status: userAuthRed.AuthReducer
};

export const selectAuthState = createFeatureSelector<AuthState>('user_auth');

export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status
);

export const getIsLoggedIn = createSelector(
    selectAuthStatusState,
    userAuthRed.getIsLoggedIn
);

export const getIsLoading = createSelector(
    selectAuthStatusState,
    userAuthRed.getIsLoading
);

export const getUserData = createSelector(
    selectAuthStatusState,
    userAuthRed.getUserData
);