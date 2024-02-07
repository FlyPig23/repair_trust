import React, { useState } from 'react';
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

function App() {
    const [userSessionId, setUserSessionId] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ConsentPage setUserSessionId={setUserSessionId} />} />
                <Route path="/survey-instruction" element={<SurveyInstruction />} />
                {[...Array(15)].map((_, index) => (
                    <Route
                        key={index}
                        path={`/survey/${index + 1}`}
                        element={ <SurveyPage
                            iteration={index + 1}
                            userSessionId={userSessionId}
                        /> }
                    />
                ))}
                <Route path="/mcq-instruction" element={<MCQInstruction />} />
                {[...Array(12)].map((_, index) => (
                    <Route
                        key={index}
                        path={`/mcq/${index + 1}`}
                        element={ <MCQPage
                            iteration={index + 1}
                            userSessionId={userSessionId}
                        /> }
                    />
                ))}
                <Route path="/demographic-survey" element={<DemographicSurvey userSessionId={userSessionId} />} />
            </Routes>
        </Router>
    );
}

export default App;
