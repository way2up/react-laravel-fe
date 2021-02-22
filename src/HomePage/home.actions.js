import {constants} from "../_constants";
import {homeService} from "./home.service";

import {alertActions} from "../_actions";

export const homeActions = {
    getAllProducts,
    apiLogout,
};

function getAllProducts() {
    return dispatch => {
        dispatch(request());

        homeService.getAllProducts()
            .then(
                products => dispatch(success(products.products)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: constants.GETALL_REQUEST } }
    function success(products) { return { type:  constants.GETALL_SUCCESS, products } }
    function failure(error) { return { type:  constants.GETALL_FAILURE, error } }
}

function apiLogout() {
    return dispatch => {
        dispatch(request());
        homeService.apiLogout()
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