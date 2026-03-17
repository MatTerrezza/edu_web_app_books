import React from 'react';
import './BlobButton.css';

const BlobButton = ({ 
  children, 
  onClick, 
  type = 'primary', // primary или secondary
  className = '',
  ...props 
}) => {
  return (
    <button 
      className={`blob-btn blob-btn-${type} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
      <span className="blob-btn__inner">
        <span className="blob-btn__blobs">
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
          <span className="blob-btn__blob"></span>
        </span>
      </span>
    </button>
  );
};

export default BlobButton;
