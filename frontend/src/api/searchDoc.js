export async function searchDoc(accessToken, query) {
    const response = await fetch('/search-doc', {
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
