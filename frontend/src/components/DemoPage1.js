import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import surveyGuide from '../assets/images/survey_guide.png';
import '../assets/DemoPage.css';

function DemoPage1() {
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

    const handleNavigate = () => {
        navigate('/page-demo/2');
    };

    return (
        <div className="image-container">
            <h1>Instruction for the Survey Page</h1>
            <p>Here is an example of the survey page you will see.</p>
            <div>
                <img src={surveyGuide} alt="Survey Guide Example"/>
                <p className="image-description">Instructions on how to do the experiment.</p>
            </div>
            <button onClick={handleNavigate}>Next</button>
        </div>
    );
}

export default DemoPage1;

