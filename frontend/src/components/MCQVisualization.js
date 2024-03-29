import React from 'react';
import '../assets/MCQVisualization.css';
import mcqData from '../assets/data/multiple_choices.json';

function MCQVisualization({ iteration, imageId }) {
    // Fetch the data for the current iteration
    const mcqItem = mcqData.find(item => item.id === imageId);
    const imageUrl = mcqItem ? mcqItem.image : ''; // Fallback to an empty string if not found

    console.log('imageID:', imageId);

    return (
        <div className="mcq-visualization">
            <h2>Visualization for Question {iteration}</h2>
            {imageUrl && <img src={imageUrl} alt={`Visualization for Question ${iteration}`} />}
        </div>
    );
}

export default MCQVisualization;
