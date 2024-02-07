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
        navigate('/survey/1');
    };

    return (
        <div className="survey-instruction-container">
            <h1>Survey Instructions</h1>
            <ul>
                <li>You will be given 15 questions.</li>
                <li>Each question will require you to evaluate a ChatGPT response and provide a final response.</li>
                <li>Answer to the best of your ability. You cannot skip questions.</li>
            </ul>
            <button onClick={handleStartSurvey}>Start Survey</button>
        </div>
    );
}

export default SurveyInstruction;
