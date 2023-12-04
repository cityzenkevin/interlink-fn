import { Document, Page } from "react-pdf";

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  return (
    <div>
      <h2>PDF Viewer</h2>
      <div className="pdf-container">
        <Document
          file={pdfUrl}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
        >
          <Page pageNumber={1} />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
