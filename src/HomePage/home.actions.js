import {constants} from "../_constants";
import {homeService} from "./home.service";

import {alertActions} from "../_actions";

export const homeActions = {
    getAllProducts,
    getAllCategories,
    apiLogout,
};

function getAllProducts() {
    return dispatch => {
        dispatch(request());

        homeService.getAllProducts()
            .then(
                data => dispatch(success(data.products)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: constants.GETALL_REQUEST } }
    function success(products) { return { type:  constants.GETALL_SUCCESS, products } }
    function failure(error) { return { type:  constants.GETALL_FAILURE, error } }
}

function getAllCategories() {
    return dispatch => {
        dispatch(request());

        homeService.getAllCategories()
            .then(
                data => dispatch(success(data.categories)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: constants.GETALL_REQUEST } }
    function success(categories) { return { type:  constants.GETALL_SUCCESS, categories } }
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