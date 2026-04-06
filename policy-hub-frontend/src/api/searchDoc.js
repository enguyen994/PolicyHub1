export async function searchDoc(accessToken, query) {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:7071/api';
    const response = await fetch(`${apiUrl}/search-doc`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ access_token: accessToken, query })
    });
    if (!response.ok) {
        throw new Error('Failed to fetch search results');
    }
    return response.json();
}

