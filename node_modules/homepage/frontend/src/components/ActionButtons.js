import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/ActionButtons.css';

function ActionButtons({ onUseGpt, onEditGpt, onWriteOwn, handleSubmitSurvey, iteration, ratings, actionChoice }) {
    const navigate = useNavigate();

    // Check if all ratings are given and an action is selected
    const isNextButtonEnabled = Object.values(ratings).every(rating => rating != null) && actionChoice;

    // Function to handle the submission and navigation to the next survey page
    const handleNext = async () => {
        // // Get the current survey number from the URL
        // const currentSurveyNumber = parseInt(window.location.pathname.split('/').pop());
        //
        // // Call the handleSubmitSurvey function passed from App.js
        // await handleSubmitSurvey(currentSurveyNumber); // Make sure this function is async or properly handles Promises
        //
        // // Calculate the next survey number
        // const nextSurveyNumber = currentSurveyNumber + 1;

        await handleSubmitSurvey(iteration);

        let nextPath;
        if (iteration % 5 === 0) { // End of a batch
            const nextCheckPage = iteration / 5 + 1;
            nextPath = `/check-${nextCheckPage}`;
        } else {
            const batch = Math.floor((iteration - 1) / 5) + 1;
            const nextInBatch = (iteration - 1) % 5 + 2; // Calculate next iteration within the current batch
            nextPath = `/survey/${batch}/${nextInBatch}`;
        }

        // Special case for the last iteration of the last batch
        if (iteration === 15) {
            nextPath = '/check-4';
        }

        navigate(nextPath);
    };

    return (
        <div className="action-buttons-wrapper">
            <div className="action-buttons">
                <button className={actionChoice === 'Use GPT Response' ? 'action-button selected' : 'action-button'} onClick={onUseGpt}>Use AI Response</button>
                <button className={actionChoice === 'Edit GPT Response' ? 'action-button selected' : 'action-button'} onClick={onEditGpt}>Edit AI Response</button>
                <button className={actionChoice === 'Write My Own Response' ? 'action-button selected' : 'action-button'} onClick={onWriteOwn}>Write My Own Response</button>
            </div>
            <div className="next-button-container">
                <button className={isNextButtonEnabled ? 'next-button' : 'next-button disabled'} onClick={handleNext} disabled={!isNextButtonEnabled}>Next</button>
            </div>
        </div>
    );
}

export default ActionButtons;
