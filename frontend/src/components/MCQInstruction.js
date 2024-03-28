import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/MCQInstruction.css';

function MCQInstruction() {
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

    const handleStartMCQ = () => {
        navigate('/mcq/1');
    };

    return (
        <div className="mcq-instruction-container">
            <h1>Multiple Choice Questions Instructions</h1>
            <p>
                The next part of the study will involve answering multiple-choice questions about data visualizations.
                The purpose of this part is to develop an instrument that measures how well people can read, understand,
                and use data visualizations to solve problems. Here's the detailed procedure for the survey:
            </p>
            <ul>
                <li>You will be given 12 multiple-choice questions.</li>
                <li>Answer to the best of your ability. If you are unsure, you may skip the questions instead of
                    guessing.
                </li>
                <li>Important: You will have 25 seconds to answer each question. If you do not answer within 25
                    seconds, the survey will automatically move to the next question.
                </li>
            </ul>
            <button onClick={handleStartMCQ}>Start Multiple-Choice Questions</button>
        </div>
    );
}

export default MCQInstruction;
