export async function logout() {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Logout failed');
    }
    window.location.href = '/';
}

