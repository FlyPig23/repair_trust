import React, { useState } from 'react';
import RatingArea from './RatingArea';
import '../assets/PreCheckSection.css';

function PreCheckSection({ onRatingsChange, isDisabled }) {
    const [ratings, setRatings] = useState({
        quality: null,
        factual: null,
        trust: null
    });

    // Update parent component whenever ratings change
    const handleRatingChange = (newRatings) => {
        if (!isDisabled) {
            setRatings(newRatings);
            onRatingsChange(newRatings); // Pass updated ratings to parent component
        }
    };

    return (
        <div className="pre-check-container">
            <h2>Initial Trust Level Check</h2>
            <p>Please rate your initial trust level in AI system.</p>
            <RatingArea ratings={ratings} onRatingChange={handleRatingChange} context="checkPage" />
        </div>
    );
}

export default PreCheckSection;
