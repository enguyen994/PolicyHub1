import { getApiBaseUrl } from './config';

export async function logout() {
    const apiUrl = getApiBaseUrl();
    const response = await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Logout failed');
    }
    window.location.href = '/';
}

