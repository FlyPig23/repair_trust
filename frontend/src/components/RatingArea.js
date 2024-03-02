import React from 'react';
import '../assets/RatingArea.css';

// Importing the images
import veryUnsatisfied from '../assets/images/very_unsatisfied.png';
import unsatisfied from '../assets/images/unsatisfied.png';
import neutral from '../assets/images/neutral.png';
import satisfied from '../assets/images/satisfied.png';
import verySatisfied from '../assets/images/very_satisfied.png';

function RatingArea({ ratings, onRatingChange, context }) {
    const faces = [veryUnsatisfied, unsatisfied, neutral, satisfied, verySatisfied];
    const faceLabels = context === 'checkPage'
        ? ["Very Unconfident", "Unconfident", "Neutral", "Confident", "Very Confident"]
        : ["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"];

    const questions = context === 'checkPage'
        ? [
            "I believe AI response will be good quality",
            "I believe AI response will be factual",
            "I believe AI response will be trustworthy"
        ]
        : [
            "I believe AI response is good quality",
            "I believe AI response is factual",
            "I believe AI response is trustworthy"
        ];

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
            {questions.map((question, index) => (
                <div key={index}>
                    <label>{question}</label>
                    {renderFaces(Object.keys(ratings)[index], question)}
                </div>
            ))}
        </div>
    );
}

export default RatingArea;
