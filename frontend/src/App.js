import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './assets/DataVisualization.css';
import './assets/RatingArea.css';
import './assets/ActionButtons.css';
import './assets/GptResponse.css';
import './assets/ConsentPage.css';
import SurveyPage from './components/SurveyPage';
import ConsentPage from './components/ConsentPage';
import MCQPage from './components/MCQPage';
import DemographicSurvey from './components/DemographicSurvey';
import SurveyInstruction from './components/SurveyInstruction';
import MCQInstruction from './components/MCQInstruction';
import CheckPage from './components/CheckPage';
import ThankYouPage from './components/ThankYouPage';
import ColorBlindTest from './components/ColorBlindTest';

function App() {
    const [userSessionId, setUserSessionId] = useState(null);
    const [group, setGroup] = useState('');
    const [surveyOrderArray, setSurveyOrderArray] = useState([]);
    const [mcqOrderArray, setMcqOrderArray] = useState([]);

    // Function to randomly assign a group
    useEffect(() => {
        const assignGroup = () => {
            // Randomly assign a group to the user
            const groups = ['bbc', 'cbc'];
            const randomGroup = groups[Math.floor(Math.random() * groups.length)];
            setGroup(randomGroup);
        };

        const generateRandomSurveyOrderArray = () => {
            let array = Array.from({ length: 15 }, (_, i) => i + 1);
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
            setSurveyOrderArray(array);
            console.log(array);
        };

        const generateRandomMCQOrderArray = () => {
            let array = Array.from({ length: 12 }, (_, i) => i + 1);
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
            setMcqOrderArray(array);
            console.log(array);
        };

        assignGroup();
        generateRandomSurveyOrderArray();
        generateRandomMCQOrderArray();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ConsentPage setUserSessionId={setUserSessionId} group={group} />} />
                <Route path="/color-blind-test" element={<ColorBlindTest setUserSessionId={setUserSessionId} />} />
                <Route path="/demographic-survey" element={<DemographicSurvey userSessionId={userSessionId} />} />
                <Route path="/survey-instruction" element={<SurveyInstruction />} />

                {/* Check page before Pre batch */}
                <Route path="/check-1" element={<CheckPage batch="Pre" userSessionId={userSessionId} />} />
                {[...Array(5)].map((_, index) => (
                    <Route
                        key={`pre-${index}`}
                        path={`/survey/1/${index + 1}`}
                        element={<SurveyPage
                            iteration={index + 1}
                            userSessionId={userSessionId}
                            group={group}
                            imageId={surveyOrderArray[index]} />}
                    />
                ))}

                {/* Check page before Destroy batch */}
                <Route path="/check-2" element={<CheckPage batch="Destroy" userSessionId={userSessionId} />} />
                {[...Array(5)].map((_, index) => (
                    <Route
                        key={`destroy-${index}`}
                        path={`/survey/2/${index + 1}`}
                        element={<SurveyPage
                            iteration={index + 6}
                            userSessionId={userSessionId}
                            group={group}
                            imageId={surveyOrderArray[index + 5]}
                        />}
                    />
                ))}

                {/* Check page before Repair batch */}
                <Route path="/check-3" element={<CheckPage batch="Repair" userSessionId={userSessionId} />} />
                {[...Array(5)].map((_, index) => (
                    <Route
                        key={`repair-${index}`}
                        path={`/survey/3/${index + 1}`}
                        element={<SurveyPage
                            iteration={index + 11}
                            userSessionId={userSessionId}
                            group={group}
                            imageId={surveyOrderArray[index + 10]}
                        />}
                    />
                ))}

                <Route path="/check-4" element={<CheckPage batch="Post" userSessionId={userSessionId} />} />

                <Route path="/mcq-instruction" element={<MCQInstruction />} />
                {[...Array(12)].map((_, index) => (
                    <Route
                        key={index}
                        path={`/mcq/${index + 1}`}
                        element={ <MCQPage
                            iteration={index + 1}
                            userSessionId={userSessionId}
                            imageId={mcqOrderArray[index]}
                        /> }
                    />
                ))}

                <Route path="/thank-you" element={<ThankYouPage userSessionId={userSessionId} />} />
            </Routes>
        </Router>
    );
}

export default App;
