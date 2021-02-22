import conf from "../config/config";
import {baseService} from '../_services';

export const authService = {
    login,
    logout,
};

function login(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: baseService.headers,
        body: JSON.stringify({ email, password })
    };

    return fetch(`${conf.api}/login`, requestOptions)
        .then(baseService.handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('access_token', data.access_token);
            return data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
}