import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingArea from './RatingArea';
import '../assets/CheckPage.css';
import '../assets/Modal.css';

function CheckPage({ batch, userSessionId }) {
    const navigate = useNavigate();
    const [ratings, setRatings] = useState({
        quality: null,
        factual: null,
        trust: null
    });
    const [repairType, setRepairType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allRatingsProvided = Object.values(ratings).every(rating => rating !== null);

    const repairPolicies = {
        ability: "Sorry, we must apologize for the recent inaccuracies in the AI responses. " +
            "These errors were directly caused by current technological limitations and the lack of advanced " +
            "capabilities in the AI system. We recognize this failure and are taking steps to improve our technology to " +
            "prevent such issues in the future.",
        integrity: "Sorry, we must apologize for the recent inaccuracies in the AI responses. These errors were directly " +
            "caused because the AI system failed to be honest with users. We recognize this failure and are taking steps " +
            "to ensure our future actions align with the highest standards of integrity.",
        benevolence: "Sorry, we must apologize for the recent inaccuracies in the AI responses. These errors were " +
            "directly caused because the AI system failed to prioritize the well-being and interests of users. We " +
            "recognize this failure and are taking steps to ensure our actions align with your best interests."
    };

    useEffect(() => {
        // Only randomly decide the repair type when transitioning to the "Repair" batch
        if (batch === 'Repair') {
            const repairTypes = ['ability', 'integrity', 'benevolence'];
            const randomType = repairTypes[Math.floor(Math.random() * repairTypes.length)];
            setRepairType(randomType);
            setIsModalOpen(true);
        }
    }, [batch]);

    const closeModal = () => setIsModalOpen(false);

    // Function to navigate to the next part of the survey based on the batch
    const handleContinue = async () => {
        const checkData = {
            userSessionId,
            batch,
            ratings,
            repairType
        };

        // Before navigating, submit the ratings to the backend
        try {
            const response = await fetch('http://localhost:3000/submit-checkpage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkData),
            });
            if (!response.ok) throw new Error('Failed to submit ratings');
        } catch (error) {
            console.error("Error submitting ratings:", error);
            // Optionally, handle the error (e.g., show a message to the user)
        }

        // Navigate based on batch
        switch(batch) {
            case 'Pre':
                navigate('/survey/1/1');
                break;
            case 'Destroy':
                navigate('/survey/2/1');
                break;
            case 'Repair':
                navigate('/survey/3/1');
                break;
            default:
                navigate('/');
        }
    };

    // Display different information based on the batch type
    const batchInfo = {
        'Pre': {
            title: "Pre 1st Batch Check",
            description: "You are about to start to analyze the first batch of data visualizations. Please ensure you are ready to proceed.",
        },
        'Destroy': {
            title: "Pre 2nd Batch Check",
            description: "You are about to start to analyze the second batch of data visualizations. Please ensure you are ready to proceed.",
        },
        'Repair': {
            title: "Pre 3rd Batch Check",
            description: "You are about to start to analyze the third batch of data visualizations. Please ensure you are ready to proceed."
        }
    };

    const modalContent = repairType ? (
        <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{repairPolicies[repairType]}</p>
        </div>
    ) : null;

    const info = batchInfo[batch] || {};

    return (
        <div className="check-page-container">
            <h1>{info.title}</h1>
            <p>{info.description}</p>
            {batch === 'Repair' && isModalOpen && (
                <div className="modal">
                    {modalContent}
                </div>
            )}
            <RatingArea ratings={ratings} onRatingChange={setRatings} context={'checkPage'} />
            <button onClick={handleContinue} disabled={!allRatingsProvided}>Continue</button>
        </div>
    );
}

export default CheckPage;
