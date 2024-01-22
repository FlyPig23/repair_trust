import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/ActionButtons.css';

function ActionButtons({ onUseGpt, onEditGpt, onWriteOwn, handleSubmitSurvey }) {
    const navigate = useNavigate();

    // Function to handle the submission and navigation to the next survey page
    const handleNext = async () => {
        // Get the current survey number from the URL
        const currentSurveyNumber = parseInt(window.location.pathname.split('/').pop());

        // Call the handleSubmitSurvey function passed from App.js
        await handleSubmitSurvey(currentSurveyNumber); // Make sure this function is async or properly handles Promises

        // Calculate the next survey number
        const nextSurveyNumber = currentSurveyNumber + 1;

        // If the next survey number is less than or equal to 15, navigate to it
        if (nextSurveyNumber <= 15) {
            navigate(`/survey/${nextSurveyNumber}`);
        } else {
            // Handle the end of the survey, maybe navigate to a completion page or home
            navigate('/completion');
        }
    };

    return (
        <div className="action-buttons-wrapper">
            <div className="action-buttons">
                <button onClick={onUseGpt}>Use GPT</button>
                <button onClick={onEditGpt}>Edit GPT</button>
                <button onClick={onWriteOwn}>Write My Own</button>
            </div>
            <div className="next-button-container">
                <button className="next-button" onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default ActionButtons;
