import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './assets/DataVisualization.css';
import './assets/RatingArea.css';
import './assets/ActionButtons.css';
import './assets/GptResponse.css';
import './assets/ConsentPage.css';
import DataVisualization from './components/DataVisualization';
import GptResponse from './components/GptResponse';
import RatingArea from './components/RatingArea';
import ActionButtons from './components/ActionButtons';
import ConsentPage from './components/ConsentPage';

function App() {
    const [userSessionId, setUserSessionId] = useState(null);
    const [gptResponse, setGptResponse] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [ratings, setRatings] = useState({
        quality: null,
        factual: null,
        trust: null,
    });
    const [actionChoice, setActionChoice] = useState(null);

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

    const handleSubmitSurvey = async (surveyNumber) => {
        const surveyData = {
            userSessionId,
            surveyNumber,
            gptResponse,
            ratings,
            actionChoice,
            // TODO: Include other data as needed
        };

        try {
            const response = await fetch('http://localhost:3000/submit-survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });

            if (response.ok) {
                console.log('Survey data submitted successfully');

                // Reset states after successful submission
                setGptResponse('');
                setRatings({
                    quality: null,
                    factual: null,
                    trust: null,
                });
                setActionChoice(null);
                setIsEditable(false); // Reset to non-editable

                // Navigate to the next survey or show a completion message
                // This part is handled in the handleNext function in ActionButtons.js
            } else {
                throw new Error('Failed to submit survey data');
            }
        } catch (error) {
            console.error("Error submitting survey data:", error);
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ConsentPage setUserSessionId={setUserSessionId} />} /> {/* Consent page as the default route */}
                {[...Array(15)].map((_, index) => (
                    <Route
                        key={index}
                        path={`/survey/${index + 1}`}
                        element={
                            <div className="app-container">
                                <div className="left-panel">
                                    <DataVisualization iteration={index + 1} />
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
                                        handleSubmitSurvey={() => handleSubmitSurvey(index + 1)}
                                    />
                                </div>
                            </div>
                        }
                    />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
