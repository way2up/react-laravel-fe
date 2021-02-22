export const baseService = {
    logout,
    handleResponse,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
};

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
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
