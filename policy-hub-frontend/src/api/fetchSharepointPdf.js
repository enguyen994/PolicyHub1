// Fetches base64 PDF from backend and returns Uint8Array
export async function fetchSharepointPdf({ access_token, file_id }) {
    const url = `http://localhost:8000/download-sharepoint-file/${file_id}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token })
    });
    const result = await response.json();
    if (result.file_content) {
        // Decode base64 to Uint8Array
        const byteCharacters = atob(result.file_content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const uint8Array = new Uint8Array(byteNumbers);
        console.log(new TextDecoder().decode(uint8Array.slice(0, 10))); // <-- Add this line
        return uint8Array;
    }
    return null;
}
