import React, { useState, useEffect, useRef } from 'react';
import DataVisualization from './DataVisualization';
import GptResponse from './GptResponse';
import RatingArea from './RatingArea';
import ActionButtons from './ActionButtons';
import {useNavigate} from "react-router-dom";
import visualizationData from '../assets/data/visualizations_data.json';

function SurveyPage({ iteration, userSessionId }) {
    const [initialGptResponse, setInitialGptResponse] = useState(''); // Store the initial GPT response
    const [currentGptResponse, setCurrentGptResponse] = useState(''); // Current GPT response being edited
    const [ratings, setRatings] = useState({
        quality: null,
        factual: null,
        trust: null,
    });
    const [actionChoice, setActionChoice] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [imageData, setImageData] = useState(null);
    const usedIndicesRef = useRef([]);

    const startTimeRef = React.useRef(Date.now());

    const navigate = useNavigate();

    useEffect(() => {
        const selectRandomImage = () => {
            let availableImages = visualizationData.filter((_, index) => !usedIndicesRef.current.includes(index));
            console.log("Available images:", availableImages);
            if (availableImages.length === 0) {
                console.error("All images have been displayed.");
                return;
            }
            let randomIndex = Math.floor(Math.random() * availableImages.length);
            console.log("Random index:", randomIndex);
            let selectedImage = availableImages[randomIndex];

            // Update imageData state and usedIndicesRef
            setImageData(selectedImage);
            usedIndicesRef.current.push(visualizationData.findIndex(item => item.index === selectedImage.index));

            let description;
            if (iteration <= 10) {
                description = selectedImage.correct_description;
            } else if (iteration <= 13) {
                description = selectedImage.incorrect_description;
            } else if (iteration <= 20) {
                description = selectedImage.correct_description;
            }

            // Update GPT response states
            setInitialGptResponse(description);
            setCurrentGptResponse(description);
        };

        selectRandomImage();
    }, [iteration]);

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

    // Handler for "Use GPT" button - Resets to the initial GPT response
    const handleUseGpt = () => {
        setIsEditable(false);
        setCurrentGptResponse(initialGptResponse); // Reset current GPT response to initial
    };

    // Handler for "Edit GPT" button - Allows editing the initial GPT response
    const handleEditGpt = () => {
        setIsEditable(true);
        setCurrentGptResponse(initialGptResponse); // Ensure the current GPT response is set to initial before editing
    };

    // Handler for "Write My Own" button - Clears the current GPT response for custom input
    const handleWriteOwn = () => {
        setCurrentGptResponse(''); // Clear the current GPT response
        setIsEditable(true);
    };

    // Handler for changes in the GPT response textarea
    const handleGptResponseChange = (newText) => {
        setCurrentGptResponse(newText); // Update current GPT response
    };

    const handleSubmitSurvey = async () => {
        // Calculate time spent before submission
        const endTime = Date.now();
        const timeSpent = endTime - startTimeRef.current;

        const surveyData = {
            userSessionId,
            surveyNumber: iteration,
            imageIndex: imageData.index,
            gptResponse: currentGptResponse,
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
                setCurrentGptResponse(initialGptResponse); // Reset to initial after submission
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
                {/* Pass imageUrl and title from imageData directly */}
                <DataVisualization imageUrl={imageData?.image} title={imageData?.title} />
            </div>
            <div className="right-panel">
                <GptResponse
                    initialResponseText={currentGptResponse}
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
                    handleSubmitSurvey={handleSubmitSurvey}
                    ratings={ratings}
                    actionChoice={actionChoice}
                />
            </div>
        </div>
    );

}

export default SurveyPage;
