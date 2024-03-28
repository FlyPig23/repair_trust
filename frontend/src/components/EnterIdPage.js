import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/EnterIdPage.css';

function EnterIdPage({ setUserSessionId }) {
    const [prolificId, setProlificId] = useState('');
    const navigate = useNavigate();

    // Attempt to retrieve an existing userSessionId from session storage
    const storedSessionId = sessionStorage.getItem('userSessionId');

    useEffect(() => {
        if (storedSessionId) {
            // If a stored session ID exists, use it to set the user session ID in the parent component
            setUserSessionId(storedSessionId);
        }
    }, [storedSessionId, setUserSessionId, navigate]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assuming there's an endpoint to handle just the ID submission
        try {
            // TODO: 13.59.246.19 or localhost:32774
            const response = await fetch('http://13.59.246.19/api/submit-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prolificId }),
            });

            if (response.ok) {
                const { userSessionId } = await response.json();
                setUserSessionId(userSessionId);

                // Store userSessionId in session storage
                sessionStorage.setItem('userSessionId', userSessionId);

                navigate('/consent');
            } else {
                console.error('Failed to submit Prolific ID');
            }
        } catch (error) {
            console.error("Error submitting Prolific ID:", error);
        }
    };

    return (
        <div className="enter-id-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your Prolific ID:
                    <input
                        type="text"
                        value={prolificId}
                        onChange={(e) => setProlificId(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={!prolificId.trim()}>Submit</button>
            </form>
        </div>
    );
}

export default EnterIdPage;
