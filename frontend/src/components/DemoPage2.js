import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import rateGuide from '../assets/images/rate_guide.png';
import '../assets/DemoPage.css';

function DemoPage2() {
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
        navigate('/survey/1/1');
    };

    return (
        <div className="image-container">
            <h1>Instruction for the Rating Page</h1>
            <p>Here is an example of the rating page you will see.</p>
            <div>
                <img src={rateGuide} alt="Rate Guide Example"/>
                <p className="image-description">Instructions on how to rate the trust level.</p>
            </div>
            <button onClick={handleNavigate}>Next</button>
        </div>
    );
}

export default DemoPage2;
