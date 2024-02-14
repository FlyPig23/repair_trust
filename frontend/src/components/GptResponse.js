import React, { useEffect, useState } from 'react';
import '../assets/GptResponse.css';

function GptResponse({ initialResponseText, isEditable, onGptResponseChange }) {
    // Initialize responseText state
    const [responseText, setResponseText] = useState(initialResponseText);

    // Handle changes to the textarea
    const handleChange = (event) => {
        setResponseText(event.target.value);
        if (onGptResponseChange) {
            onGptResponseChange(event.target.value); // Call onGptResponseChange if it's provided
        }
    };

    // Update responseText if initialResponseText changes
    useEffect(() => {
        if (initialResponseText !== undefined) { // Check if initialResponseText is not undefined before setting it
            setResponseText(initialResponseText);
        }
    }, [initialResponseText]);

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
