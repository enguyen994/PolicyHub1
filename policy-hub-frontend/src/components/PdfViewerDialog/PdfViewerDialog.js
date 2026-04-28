
import React from 'react';
import '../PdfViewerDialog/PdfViewerDialog.css';
import PdfDoc from '../PdfDoc/PdfDoc';


const PdfViewerDialog = ({ open, onClose, fileUrl, matchWords, loading }) => {
    if (!open) return null;
    console.log(matchWords);
    return (
        <div className="pdf-dialog-overlay">
            <div className="pdf-dialog pdf-dialog-large">
                <button className="pdf-dialog-close" onClick={onClose} aria-label="Close PDF dialog">&times;</button>
                {loading ? (
                    <div className="pdf-loader" role="status">
                        <span className="pdf-spinner" />
                    </div>
                ) : fileUrl ? (
                    <PdfDoc pdfData={fileUrl} matchWords={matchWords} />
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>PDF not available.</div>
                )}
            </div>
        </div>
    );
};

export default PdfViewerDialog;

