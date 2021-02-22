import conf from "../config/config";
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    apiLogout,
};
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

function login(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password })
    };

    return fetch(`${conf.api}/login`, requestOptions)
        .then(handleResponse)
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

function apiLogout() {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return fetch(`${conf.api}/logout`, requestOptions).then(handleResponse)

}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${conf.api}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${conf.api}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    };

    return fetch(`${conf.api}/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${conf.api}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${conf.api}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // eslint-disable-next-line no-restricted-globals
                location.reload(true);
            }
            const error = (data.errors && data.errors[Object.keys(data.errors)[0]][0]) || (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}