import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const RemovePDF = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/getPDF`, { withCredentials: true })
      .then((res) => {
        setPdfs(res.data.getpdf); 
      })
      .catch((err) => {
        console.error("Failed to fetch PDFs:", err);
      });
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletePDF/${id}`, { withCredentials: true });
      setPdfs(prev => prev.filter(pdf => pdf.id !== id)); 
    } catch (err) {
      console.error("Error removing PDF:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Uploaded PDFs</h2>

      {pdfs.length === 0 ? (
        <p>No PDFs found.</p>
      ) : (
        <ul className="space-y-4">
          {pdfs.map((pdf) => (
            <li key={pdf._id} className="border p-4 rounded-md shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{pdf.title}</p>
                <a href={pdf.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  View PDF
                </a>
              </div>
              <button
                onClick={() => handleRemove(pdf._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemovePDF;
