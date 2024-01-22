import React from 'react';
import '../assets/RatingArea.css';

// Importing the images
import veryUnsatisfied from '../assets/images/very_unsatisfied.png';
import unsatisfied from '../assets/images/unsatisfied.png';
import neutral from '../assets/images/neutral.png';
import satisfied from '../assets/images/satisfied.png';
import verySatisfied from '../assets/images/very_satisfied.png';

function RatingArea({ ratings, onRatingChange }) {
    const faces = [veryUnsatisfied, unsatisfied, neutral, satisfied, verySatisfied];
    const faceLabels = ["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"]; // Labels for each face

    const handleRatingChange = (ratingType, value) => {
        onRatingChange({ ...ratings, [ratingType]: value });
    };

    const renderFaces = (ratingType) => (
        <div className="rating-faces">
            {faces.map((face, index) => (
                <div key={index} className="face-container">
                    <img
                        src={face}
                        alt={`Rating ${index + 1}`}
                        className={`rating-face ${ratings[ratingType] === index + 1 ? 'selected' : ''}`}
                        onClick={() => handleRatingChange(ratingType, index + 1)}
                    />
                    <span className="face-label">{faceLabels[index]}</span> {/* Label for each face */}
                </div>
            ))}
        </div>
    );

    return (
        <div className="rating-area">
            <h3>Ratings</h3>
            <div>
                <label>I believe this is good quality</label>
                {renderFaces('quality')}
            </div>
            <div>
                <label>I am confident that GPT is factual</label>
                {renderFaces('factual')}
            </div>
            <div>
                <label>I trust GPT response</label>
                {renderFaces('trust')}
            </div>
        </div>
    );
}

export default RatingArea;
