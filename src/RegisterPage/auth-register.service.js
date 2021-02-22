import conf from "../config/config";
import {baseService} from '../_services';

export const authRegisterService = {
    register,
};

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: baseService.headers,
        body: JSON.stringify(user)
    };

    return fetch(`${conf.api}/register`, requestOptions).then(baseService.handleResponse);
}