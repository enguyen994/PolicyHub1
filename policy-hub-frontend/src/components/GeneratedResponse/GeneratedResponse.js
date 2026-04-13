import React from "react";
import "./GeneratedResponse.css";
// No need for DOMPurify since we won't use dangerouslySetInnerHTML

// Format summary: preserve newlines, bold, etc.
function formatSummary(summary) {
    // Split summary into lines
    const lines = summary.split('\n');
    return lines.map((line, idx) => {
        // Replace **text** with bold first
        const parts = [];
        let lastIndex = 0;
        const boldRegex = /\*\*(.*?)\*\*/g;
        let match;
        while ((match = boldRegex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                parts.push(line.substring(lastIndex, match.index));
            }
            parts.push(<strong key={idx + '-b-' + match.index}>{match[1]}</strong>);
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < line.length) {
            parts.push(line.substring(lastIndex));
        }

        // Now process hashtags in each part
        const finalParts = [];
        parts.forEach((part, i) => {
            if (typeof part === 'string') {
                // Replace hashtags with span
                const hashtagRegex = /(#\w+)/g;
                let last = 0;
                let m;
                let keyBase = idx + '-h-' + i + '-';
                let subIdx = 0;
                while ((m = hashtagRegex.exec(part)) !== null) {
                    if (m.index > last) {
                        finalParts.push(part.substring(last, m.index));
                    }
                    finalParts.push(<span className="hashtag" key={keyBase + subIdx}>{m[1]}</span>);
                    last = m.index + m[0].length;
                    subIdx++;
                }
                if (last < part.length) {
                    finalParts.push(part.substring(last));
                }
            } else {
                finalParts.push(part);
            }
        });
        return <React.Fragment key={idx}>{finalParts}{idx < lines.length - 1 ? <br /> : null}</React.Fragment>;
    });
}

const GeneratedResponse = ({ summary }) => {
    if (!summary) return null;
    return (
        <div className="generated-response">
            <div>{formatSummary(summary)}</div>
        </div>
    );
};

export default GeneratedResponse;
