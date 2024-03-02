import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/SurveyInstruction.css';

function SurveyInstruction() {
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

    const handleStartSurvey = () => {
        navigate('/check-1');
    };

    return (
        <div className="survey-instruction-container">
            <h1>Survey Instructions</h1>
            <ul>
                <li>You will be given 15 data visualizations.</li>
                <li>Each turn will require you to evaluate a ChatGPT response and provide a final response.</li>
                <li>Answer to the best of your ability. You cannot skip questions.</li>
                <li>Write no more than 3 sentences for each response if you choose to write your own.</li>
            </ul>
            <button onClick={handleStartSurvey}>Start Survey</button>
        </div>
    );
}

export default SurveyInstruction;
