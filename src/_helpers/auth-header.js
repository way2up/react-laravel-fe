export function authHeader() {
    // return authorization header with jwt token
    const token = localStorage.getItem('access_token');

    if (token) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    } else {
        return {};
    }
}