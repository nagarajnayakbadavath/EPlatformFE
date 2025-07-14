import React, { useState } from 'react';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState('');

  const handleShowContact = (type) => {
    if (type === 'email') {
      setContactInfo('Email: nagarajnayakbadavath@gmail.com');
    } else if (type === 'phone') {
      setContactInfo('Phone: +91-6304731004');
    }
  };

  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
      <div className="space-x-4">
        <button
          onClick={() => handleShowContact('email')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Show Email
        </button>
        <button
          onClick={() => handleShowContact('phone')}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Show Phone
        </button>
      </div>
      {contactInfo && (
        <p className="mt-4 text-yellow-300 font-medium">{contactInfo}</p>
      )}
    </footer>
  );
};

export default Footer;
