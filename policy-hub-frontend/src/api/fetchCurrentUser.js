import { getApiBaseUrl } from './config';

export async function fetchCurrentUser() {
    const apiUrl = getApiBaseUrl();
    const response = await fetch(`${apiUrl}/auth/me`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        if (response.status === 401) {
            return null;
        }
        throw new Error('Failed to fetch current user');
    }

    const data = await response.json();
    return data.user || null;
}
