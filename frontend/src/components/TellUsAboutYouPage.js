import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ColorBlindTest from './ColorBlindTest';
import DemographicSurvey from './DemographicSurvey';
import PreCheckSection from "./PreCheckSection";
import '../assets/TellUsAboutYouPage.css';

function TellUsAboutYouPage({ userSessionId }) {
    const navigate = useNavigate();

    const [isDisabled, setIsDisabled] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [demographicData, setDemographicData] = useState({
        age: '',
        gender: '',
        education: '',
        familiarity: '',
        aiExperience: '',
        aiTrust: '',
        employmentStatus: '',
        industryRelated: '',
        journalismExperience: '',
        comments: ''
    });
    const [preCheckRatings, setPreCheckRatings] = useState({
        quality: null,
        factual: null,
        trust: null
    });
    const [colorBlindResult, setColorBlindResult] = useState('');

    useEffect(() => {
        // Push a new entry into the history stack
        window.history.pushState(null, null, window.location.pathname);

        // Handle back button or back navigation
        const handleBack = (event) => {
            event.preventDefault(); // Prevent default back behavior

            // Display an alert message
            alert("You cannot go back during the survey.");
        };

        const handleBeforeUnload = (event) => {
            event.preventDefault();

            // Display an alert message
            alert("You cannot refresh the page during the survey.");
        };

        // Add event listener for popstate
        window.addEventListener('popstate', handleBack);
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function
        return () => {
            window.removeEventListener('popstate', handleBack);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [navigate]);

    // Handle submission for each section if necessary. For this example, it's more of a placeholder.
    const handleDemographicDataSave = (data) => {
        setDemographicData(data);
    };

    const handleCheckRatings = (data) => {
        setPreCheckRatings(data);
    };

    const handleColorBlindTestResult = (result) => {
        setColorBlindResult(result);
    };

    const isDemographicDataComplete = () => {
        return Object.keys(demographicData).every(key => demographicData[key] !== '' || key === 'comments');
    };

    const isPreCheckRatingsComplete = () => {
        return Object.values(preCheckRatings).every(rating => rating !== null);
    };

    const handleSubmitAll = async () => {
        if (!isDemographicDataComplete() || !isPreCheckRatingsComplete()) {
            alert("Please complete all required fields before submitting.");
            return;
        }

        if (colorBlindResult !== '7,6') {
            setShowFailureMessage(true);
            setIsDisabled(true);
            return;
        }

        setIsDisabled(true);

        // Collecting all data for submission
        const allData = {
            userSessionId,
            demographicData,
            preCheckRatings,
            colorBlindResult
        };

        // TODO: 13.59.246.19 or localhost:32774
        try {
            const response = await fetch('http://13.59.246.19/api/submit-about-you', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(allData)
            });

            if (response.ok) {
                // Navigate to the next page upon successful submission
                navigate('/survey-instruction');
            } else {
                // Handle server errors or invalid submissions
                console.error('Submission failed:', await response.text());
                setIsDisabled(false);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setIsDisabled(false);
        }
    };

    return (
        <div className="tell-us-about-you-container">
            <h1>Tell Us About You</h1>
            <DemographicSurvey onSave={handleDemographicDataSave} isDisabled={isDisabled}/>
            <PreCheckSection onRatingsChange={handleCheckRatings} isDisabled={isDisabled}/>
            <ColorBlindTest onTestResult={handleColorBlindTestResult} isDisabled={isDisabled}/>
            <button
                onClick={handleSubmitAll}
                disabled={
                    !isDemographicDataComplete() ||
                    !isPreCheckRatingsComplete() ||
                    !colorBlindResult ||
                    isDisabled
                }
            >
                Submit All
            </button>

            {showFailureMessage && (
                <div className="failure-message">
                    <p>Sorry, you failed the color blindness test. Please close this survey and thank you for your
                        participation.</p>
                    <button onClick={() => setShowFailureMessage(false)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default TellUsAboutYouPage;
