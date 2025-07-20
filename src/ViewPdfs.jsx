import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_URL } from './config';

const ViewPdfs = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/getPDF`, { withCredentials: true })
      .then((res) => {
        setPdfs(res.data.getpdf);
      })
      .catch((err) => {
        console.error("Failed to fetch PDFs:", err);
      });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Available PDFs</h2>
      {pdfs.length === 0 ? (
        <p>No PDFs found.</p>
      ) : (
        pdfs.map((pdf, index) => (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            <h3>{pdf.title}</h3>
            <p>{pdf.description}</p>
           
            <a
  href={`https://docs.google.com/viewer?url=${encodeURIComponent(
    "https://res.cloudinary.com/dof28fswd/raw/upload/PDFs/1752998049249-LatestResume.pdf"
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
>
  📄 View Resume (PDF)
</a>

          </div>
        ))
      )}
    </div>
  );
};

export default ViewPdfs;
