import React, { useState } from 'react';
import PdfViewerDialog from '../PdfViewerDialog/PdfViewerDialog';
import { FiExternalLink } from 'react-icons/fi';
import '../RelatedDocs/RelatedDocs.css';
import { fetchSharepointPdf } from '../../api/fetchSharepointPdf';

const RelatedDocItem = ({ doc, matchWords }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [pdfData, setPdfData] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleOpen = async () => {
        setOpenDialog(true);
        setLoading(true);
        try {
            const file_id = doc.document_id;
            const pdfBytes = await fetchSharepointPdf({ file_id });
            setPdfData(pdfBytes);
        } catch (e) {
            setPdfData(null);
        }
        setLoading(false);
    };
    const handleClose = () => {
        setOpenDialog(false);
        setPdfData(null);
    };
    return (
        <>
            <div className="related-doc-item">
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={handleOpen}>{doc.filename}</span>
                <a href={doc.filepath} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', textDecoration: 'none', color: 'black', fontWeight: 500 }}>
                    <FiExternalLink style={{ marginLeft: '6px' }} />
                </a>
                {/* <span style={{ marginLeft: 'auto', color: 'black', fontSize: '18px', fontWeight: 'bold' }}>
                    {(doc.search_score * 100).toFixed(1)}%
                </span> */}
            </div>
            {/* {openDialog && (
                <PdfViewerDialog
                    open={openDialog}
                    onClose={handleClose}
                    fileUrl={pdfData}
                    matchWords={doc.match_words}
                    loading={loading}
                />
            )} */}
            {openDialog && (
                <>
                    {console.log('RelatedDocItem matchWords (from Dashboard):', matchWords)}
                    <PdfViewerDialog
                        open={openDialog}
                        onClose={handleClose}
                        fileUrl={pdfData}
                        matchWords={matchWords}
                        loading={loading}
                    />
                </>
            )}
        </>
    );
};

export default RelatedDocItem;
