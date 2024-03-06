import React, { useEffect } from 'react';
import MCQVisualization from './MCQVisualization';
import MultipleChoiceQuestions from './MultipleChoiceQuestions';
import { useNavigate } from 'react-router-dom';

function MCQPage({ iteration, userSessionId, imageId }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Push a new entry into the history stack
        window.history.pushState(null, null, window.location.pathname);

        // Handle back button or back navigation
        const handleBack = (event) => {
            event.preventDefault(); // Prevent default back behavior

            // Display an alert message
            alert("You cannot go back during the survey.");
        };

        // Add event listener for popstate
        window.addEventListener('popstate', handleBack);

        // Cleanup function
        return () => {
            window.removeEventListener('popstate', handleBack);
        };
    }, [navigate]);

    return (
        <div className="app-container">
            <div className="left-panel">
                <MCQVisualization iteration={iteration} imageId={imageId} />
            </div>
            <div className="right-panel">
                <MultipleChoiceQuestions
                    questionNumber={iteration}
                    userSessionId={userSessionId}
                />
            </div>
        </div>
    );
}

export default MCQPage;
