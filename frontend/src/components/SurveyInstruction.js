import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/SurveyInstruction.css';
import rateGuide from '../assets/images/rate_guide.png';
import surveyGuide from '../assets/images/survey_guide.png';

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
        navigate('/check-1');
    };

    return (
        <div className="survey-instruction-container">
            <h1>Survey Instructions</h1>
            <h2>Welcome and Thank You for Participating in Our Research Study!</h2>
            <p>
                A leading technology company, DataVisAI, has developed a groundbreaking Artificial Intelligence (AI)
                system designed to simplify and enhance the way we interact with data. This initial version of the
                system
                is engineered to help users analyze and interpret data visualizations. DataVisAI's technology aims to
                revolutionize data interpretation across various sectors, including healthcare, finance, education, and
                environmental studies, by providing clear and actionable insights. The accuracy and user trust in these
                AI-generated insights are critical to the success of the technology. <br/>
                Your participation in this study will help us evaluate the AI system's performance and identify areas
                for
                improvement. You will be presented with a series of data visualizations and asked to evaluate the AI
                system's responses. Your feedback will be invaluable in shaping the future of this technology.
                Here's the detailed procedure for the survey: <br/>
            </p>
            <ul>
                <li>You will be given 15 data visualizations, in 3 batches of 5 visualizations each.</li>
                <li>At the beginning, you will be asked to rate your initial trust level in the AI system's ability.
                </li>
                <li>After each batch, you will be asked to rate your trust level in the AI system's ability based on
                    your experience with the AI system.
                </li>
                <li>Each turn will require you to analyze the visualization, then evaluate an AI generated response.
                </li>
                <li>After evaluating the AI response, you can rate your trust in the AI system's ability
                    based on the response.
                </li>
                <li>You also have the option to determine whether you would use the AI system's response, or edit it
                    before using it, or write a completely new response.
                </li>
                <li>Write no more than 3 sentences for each response if you choose to write your own.</li>
                <li>Answer to the best of your ability. You cannot skip questions.</li>
            </ul>
            <h2>Below are detailed instructions of the upcoming survey:</h2>
            <div className="image-container">
                <img src={rateGuide} alt="Rate Guide Example"/>
                <p className="image-description">Instructions on how to rate the trust level.</p>
                <img src={surveyGuide} alt="Survey Guide Example"/>
                <p className="image-description">Instructions on how to do the experiment.</p>
            </div>
            <br/>
            <button onClick={handleStartSurvey}>Start Survey</button>
        </div>
    );
}

export default SurveyInstruction;
