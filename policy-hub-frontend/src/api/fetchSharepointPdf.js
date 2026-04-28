import { getApiBaseUrl } from './config';

// Fetches base64 PDF from backend and returns Uint8Array
export async function fetchSharepointPdf({ file_id }) {
    const url = `${getApiBaseUrl()}/download-sharepoint-file/${file_id}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({})
    });

    if (!response.ok) {
        throw new Error('Failed to fetch PDF file');
    }

    const result = await response.json();
    if (result.file_content) {
        // Decode base64 to Uint8Array
        const byteCharacters = atob(result.file_content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const uint8Array = new Uint8Array(byteNumbers);
        return uint8Array;
    }
    return null;
}
