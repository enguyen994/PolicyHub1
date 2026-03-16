import React from 'react';
import './RelatedDocs.css';
import RelatedDocItem from '../RelatedDocItem/RelatedDocItem';

const RelatedDocs = ({ documents, matchWords }) => {
    if (!documents || !documents.length) return null;
    return (
        <div className="related-docs">
            <h2>Related Documents</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {documents.map(doc => (
                    <RelatedDocItem key={doc.document_id} doc={doc} matchWords={matchWords} />
                ))}
            </div>
        </div>
    );
};

export default RelatedDocs;