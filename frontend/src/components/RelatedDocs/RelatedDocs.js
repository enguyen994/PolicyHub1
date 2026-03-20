import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import './RelatedDocs.css';

export default function RelatedDocs({ documents }) {
    if (!documents || !documents.length) return null;
    return (
        <div className="related-docs">
            <h2>Related Documents</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {documents.map(doc => (
                    <div key={doc.document_id} className="related-doc-item">
                        <span>{doc.filename}</span>
                        <a href={doc.filepath} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black', fontWeight: 500 }}>
                            <FiExternalLink style={{ marginLeft: '6px' }} />
                        </a>
                        <span style={{ marginLeft: 'auto', color: 'black', fontSize: '18px', fontWeight: 'bold' }}>
                            {(doc.search_score * 100).toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
