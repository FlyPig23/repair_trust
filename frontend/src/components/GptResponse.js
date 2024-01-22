import React from 'react';
import '../assets/GptResponse.css';

function GptResponse({ responseText, isEditable, onGptResponseChange }) {
    const handleChange = (event) => {
        onGptResponseChange(event.target.value);
    };

    return (
        <div className="gpt-response">
            <h3>GPT Response</h3>
            <textarea
                readOnly={!isEditable}
                value={responseText}
                onChange={handleChange}
            />
        </div>
    );
}

export default GptResponse;
