import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/SurveyInstruction.css';

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

    const handleStartDemo = () => {
        navigate('/page-demo/1');
    };

    return (
        <div className="survey-instruction-container">
            <h1>Survey Instructions</h1>
            <h2>Welcome and Thank You for Participating in Our Research Study!</h2>
            <p>
                In this study, you will be playing the role of a journalist at a major national newspaper tasked with
                writing summary descriptions for data visualizations that will be included in upcoming articles. <br/>
                We have provided AI-generate summaries to aid this process. You can choose to use of AI summaries or
                edit them. You will be asked to give feedback on the AI’s performance with each visualization. <br/>
                You will repeat this process for a total of <strong>15 visualizations</strong>, with a short optional
                break between each set of 5.  <br/>
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
            <button onClick={handleStartDemo}>Next</button>
        </div>
    );
}

export default SurveyInstruction;
