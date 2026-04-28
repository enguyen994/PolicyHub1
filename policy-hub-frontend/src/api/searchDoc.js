import { getApiBaseUrl } from './config';

export async function searchDoc(query) {
    const apiUrl = getApiBaseUrl();
    const response = await fetch(`${apiUrl}/search-doc`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ query })
    });
    if (!response.ok) {
        throw new Error('Failed to fetch search results');
    }
    return response.json();
}

