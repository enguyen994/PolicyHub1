import React from 'react';
import './GeneratedResponse.css';

// Format summary: preserve newlines, bold, etc.
function formatSummary(summary) {
    // Replace **text** with <strong>text</strong>
    let formatted = summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace newlines with <br/>
    formatted = formatted.replace(/\n/g, '<br/>');
    return formatted;
}

export default function GeneratedResponse({ summary }) {
    if (!summary) return null;
    return (
        <div className="generated-response">
            <div dangerouslySetInnerHTML={{ __html: formatSummary(summary) }} />
        </div>
    );
}
