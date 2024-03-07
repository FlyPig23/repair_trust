import React from 'react';
import '../assets/ThankYouPage.css'; // Adjust the path as necessary

function ThankYouPage({ userSessionId }) {
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
