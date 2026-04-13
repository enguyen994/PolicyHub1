
import React from 'react';
import '../PdfHighlight/PdfHighlight.css';

// Securely escape HTML entities to prevent XSS
function escapeHtml(text) {
	return text.replace(/[&<>'"/]/g, function (char) {
		const escapeChars = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
			'/': '&#x2F;'
		};
		return escapeChars[char] || char;
	});
}

// Helper to highlight words in text
function highlightText(text, matchWords) {
	if (!matchWords || matchWords.length === 0) return escapeHtml(text);
	// Escape regex special chars in words
	const escapedWords = matchWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
	const regex = new RegExp(`(${escapedWords.join('|')})`, 'gi');
	// Split and highlight securely
	return text.split(regex).map((part, i) =>
		regex.test(part)
			? <span key={i} className="pdf-highlight">{escapeHtml(part)}</span>
			: escapeHtml(part)
	);
}

const PdfHighlight = ({ textContent, matchWords }) => {
	// textContent: string, matchWords: array of words to highlight
	return (
		<div className="pdf-highlight-layer">
			{highlightText(textContent || '', matchWords || [])}
		</div>
	);
};

export default PdfHighlight;
