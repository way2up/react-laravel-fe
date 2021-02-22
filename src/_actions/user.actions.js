import { constants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    apiLogout,
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        userService.login(email, password)
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
    userService.logout();
    return { type: constants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
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

    function request(user) { return { type: constants.REGISTER_REQUEST, user } }
    function success(user) { return { type: constants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: constants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: constants.GETALL_REQUEST } }
    function success(users) { return { type: constants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: constants.GETALL_FAILURE, error } }
}

function apiLogout() {
    return dispatch => {
        dispatch(request());
        userService.apiLogout()
            .then(
                data => {
                    dispatch(success(data));
                    this.history.push('/login');
                    dispatch(alertActions.success('You have successfully logged out'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: constants.GETALL_REQUEST } }
    function success(users) { return { type: constants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: constants.GETALL_FAILURE, error } }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: constants.DELETE_REQUEST, id } }
    function success(id) { return { type: constants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: constants.DELETE_FAILURE, id, error } }
}