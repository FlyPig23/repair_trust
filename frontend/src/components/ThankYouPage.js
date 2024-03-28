import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/ThankYouPage.css';

function ThankYouPage({ userSessionId }) {
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

    return (
        <div className="thank-you-container">
            <h1>Thank You!</h1>
            <p>
                Thank you for participating in our study. Your responses have been recorded. <br/>
                Your user session ID is: <strong>{userSessionId}</strong>. Please copy this ID and paste it in the
                placeholder in the Mechanical Turk HIT.
            </p>
        </div>
    );
}

export default ThankYouPage;
