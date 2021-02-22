import { constants } from '../_constants';
import { authRegisterService } from './auth-register.service';
import { alertActions } from '../_actions';

export const authRegisterActions = {
    register,
};

function register(user) {
    return dispatch => {
        dispatch(request(user));
        authRegisterService.register(user)
            .then(
                user => {
                    dispatch(success());
                    this.history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: constants.userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type:  constants.userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type:  constants.userConstants.REGISTER_FAILURE, error } }
}