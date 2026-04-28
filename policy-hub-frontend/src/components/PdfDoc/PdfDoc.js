import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { searchPlugin } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '../PdfDoc/PdfDoc.css';

import * as pdfjsLib from 'pdfjs-dist/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

const PdfDoc = ({ pdfData, matchWords }) => {
	const [pdfUrl, setPdfUrl] = useState(null);

	// Clean keywords
	const safeKeywords = Array.isArray(matchWords)
		? matchWords
			.filter(w => typeof w === 'string' && w.trim().length > 2 && isNaN(Number(w)))
			.map(w => w.replace(/[.,/#!$%^&*;:{}=\\-_`~()]/g, '').trim())
			.filter(w => w && typeof w === 'string' && w.length > 2)
		: [];

	// Pass keywords directly to the plugin
	const searchPluginInstance = searchPlugin({
		keyword: safeKeywords,
	});

	useEffect(() => {
		if (pdfData) {
			const blob = new Blob([pdfData], { type: 'application/pdf' });
			const url = URL.createObjectURL(blob);
			setPdfUrl(url);
			return () => URL.revokeObjectURL(url);
		} else {
			setPdfUrl(null);
		}
	}, [pdfData]);

	if (!pdfUrl) return <div>PDF not available.</div>;

	return (
		<div className="pdf-doc-container">
			<Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
				<Viewer
					fileUrl={pdfUrl}
					defaultScale={1.0}
					renderLoader={() => (
						<div className="pdf-loader" role="status">
							<span className="pdf-spinner" />
						</div>
					)}
					plugins={[searchPluginInstance]}
				/>
			</Worker>
		</div>
	);
};

export default PdfDoc;