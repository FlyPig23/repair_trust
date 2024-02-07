import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/ActionButtons.css';

function ActionButtons({ onUseGpt, onEditGpt, onWriteOwn, handleSubmitSurvey, ratings, actionChoice }) {
    const navigate = useNavigate();

    // Check if all ratings are given and an action is selected
    const isNextButtonEnabled = Object.values(ratings).every(rating => rating != null) && actionChoice;

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
            // If the surveys are finished, navigate to the multiple-choice question instruction page
            navigate('/mcq-instruction');
        }
    };

    return (
        <div className="action-buttons-wrapper">
            <div className="action-buttons">
                <button className={actionChoice === 'Use GPT' ? 'action-button selected' : 'action-button'} onClick={onUseGpt}>Use GPT</button>
                <button className={actionChoice === 'Edit GPT' ? 'action-button selected' : 'action-button'} onClick={onEditGpt}>Edit GPT</button>
                <button className={actionChoice === 'Write My Own' ? 'action-button selected' : 'action-button'} onClick={onWriteOwn}>Write My Own</button>
            </div>
            <div className="next-button-container">
                <button className={isNextButtonEnabled ? 'next-button' : 'next-button disabled'} onClick={handleNext} disabled={!isNextButtonEnabled}>Next</button>
            </div>
        </div>
    );
}

export default ActionButtons;
