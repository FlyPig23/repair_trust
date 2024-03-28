import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/RestPage.css';

function RestPage({ batch }) {
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

    const handleContinue = () => {
        if (batch === "first") {
            navigate('/check-2');
        } else if (batch === "second") {
            navigate('/check-3');
        } else if (batch === "third") {
            navigate('/mcq-instruction');
        }
    };

    return (
        <div className="rest-page-container">
            <h2>Take a Break</h2>
            <p>Take a break if you need one...</p>
            <button onClick={handleContinue}>Continue</button>
        </div>
    );
}

export default RestPage;
