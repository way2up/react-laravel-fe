import { authHeader } from '../_helpers';
import conf from "../config/config";
import {baseService} from '../_services';


export const homeService = {
    getAllProducts,
    apiLogout
};

function getAllProducts() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${conf.api}/products`, requestOptions).then(baseService.handleResponse);
}

function apiLogout() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return fetch(`${conf.api}/logout`, requestOptions).then(baseService.handleResponse)
}