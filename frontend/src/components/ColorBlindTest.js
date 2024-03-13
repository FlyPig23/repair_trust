import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/ColorBlindTest.css';
import test1 from '../assets/images/colorblind-test-image1.jpg';
import test2 from '../assets/images/colorblind-test-image2.jpg';

function ColorBlindTest() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [showFailureMessage, setShowFailureMessage] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // Add this line

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true); // Disable the form once it's submitted
        if (selectedOption === "7,6") {
            navigate('/demographic-survey');
        } else {
            setShowFailureMessage(true);
        }
    };

    return (
        <div className="color-blind-test-container">
            <h1>Color Blindness Test</h1>
            <p>Please select what you see in the images:</p>
            <div>
                <img src={test1} alt="Color Blindness Test 1" />
                <img src={test2} alt="Color Blindness Test 2" />
            </div>
            <form onSubmit={handleSubmit}>
                {['9,6', '7,6', '9,8', '7,8'].map(option => (
                    <label key={option}>
                        <input
                            type="radio"
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                            disabled={isSubmitted} // Disable inputs after submission
                        />
                        {option}
                    </label>
                ))}
                <button type="submit" disabled={isSubmitted}>Submit</button>
            </form>
            {showFailureMessage && (
                <div className="failure-message">
                    <p>Sorry, you failed the color blindness test. Please close this survey and thank you for your participation.</p>
                    <button onClick={() => setShowFailureMessage(false)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default ColorBlindTest;
