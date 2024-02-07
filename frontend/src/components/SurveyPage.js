import React, { useState, useEffect } from 'react';
import DataVisualization from './DataVisualization';
import GptResponse from './GptResponse';
import RatingArea from './RatingArea';
import ActionButtons from './ActionButtons';
import {useNavigate} from "react-router-dom";

function SurveyPage({ iteration, userSessionId }) {
    const [gptResponse, setGptResponse] = useState('');
    const [ratings, setRatings] = useState({
        quality: null,
        factual: null,
        trust: null,
    });
    const [actionChoice, setActionChoice] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    const startTimeRef = React.useRef(Date.now());

    const navigate = useNavigate();

    // Update startTimeRef at the beginning of each survey page render
    useEffect(() => {
        startTimeRef.current = Date.now(); // Reset start time on each survey iteration
    }, [iteration]);

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

    const handleUseGpt = () => {
        setIsEditable(false);
    };

    const handleEditGpt = () => {
        setIsEditable(true);
    };

    const handleWriteOwn = () => {
        setGptResponse('');
        setIsEditable(true);
    };

    const handleGptResponseChange = (newText) => {
        setGptResponse(newText);
    };

    const handleSubmitSurvey = async () => {
        // Calculate time spent before submission
        const endTime = Date.now();
        const timeSpent = endTime - startTimeRef.current;

        const surveyData = {
            userSessionId,
            surveyNumber: iteration,
            gptResponse,
            ratings,
            actionChoice,
            timeSpent,
        };

        try {
            // Submit survey data
            const response = await fetch('http://localhost:3000/submit-survey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(surveyData),
            });

            if (response.ok) {
                console.log('Survey data submitted successfully');
                // Reset state after submission
                setGptResponse('');
                setRatings({ quality: null, factual: null, trust: null });
                setActionChoice(null);
                setIsEditable(false);
            } else {
                console.error('Failed to submit survey data: Response was not OK.');
            }
        } catch (error) {
            console.error("Error submitting survey data:", error);
        }
    };

    return (
        <div className="app-container">
            <div className="left-panel">
                <DataVisualization iteration={iteration} />
            </div>
            <div className="right-panel">
                <GptResponse
                    responseText={gptResponse}
                    isEditable={isEditable}
                    onGptResponseChange={handleGptResponseChange}
                />
                <RatingArea
                    ratings={ratings}
                    onRatingChange={setRatings}
                />
                <ActionButtons
                    onUseGpt={() => {
                        handleUseGpt();
                        setActionChoice('Use GPT');
                    }}
                    onEditGpt={() => {
                        handleEditGpt();
                        setActionChoice('Edit GPT');
                    }}
                    onWriteOwn={() => {
                        handleWriteOwn();
                        setActionChoice('Write My Own');
                    }}
                    handleSubmitSurvey={() => handleSubmitSurvey(iteration)}
                    ratings={ratings}
                    actionChoice={actionChoice}
                />
            </div>
        </div>
    );
}

export default SurveyPage;

