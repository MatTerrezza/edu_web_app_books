import React from 'react';
import './FlipCard.css';
import BlobButton from './BlobButton';

const FlipCard = ({ 
  image,
  backImage,
  title, 
  buttonText = "Купить", 
  onButtonClick 
}) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img src={image} alt={title} />
          <h2>{title}</h2>
        </div>
        <div className="card-back">
          <img src={backImage || image} alt={title} />
          <BlobButton 
            type="secondary"
            onClick={onButtonClick}
          >
            {buttonText}
          </BlobButton>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
