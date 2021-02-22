import { constants } from '../_constants';
import { authService } from './auth.service';
import { alertActions } from '../_actions';

export const authActions = {
    login,
    logout,
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        authService.login(email, password)
            .then(
                data => {
                    this.history.push({  pathname: '/'})
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: constants.LOGIN_REQUEST, user } }
    function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: constants.LOGIN_FAILURE, error } }
}

function logout() {
    authService.logout();
    return { type: constants.LOGOUT };
}

