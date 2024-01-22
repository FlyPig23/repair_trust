import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/ConsentPage.css';

function ConsentPage({ setUserSessionId }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        education: '',
        colorBlind: '',
        familiarity: '',
        comments: ''
    });

    const ages = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
    const educations = [
        'High School Diploma / GED',
        'Associate Degree',
        'Bachelors Degree',
        'Masters Degree',
        'Doctorate Degree'
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConsent = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/submit-consent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                setUserSessionId(result.userSessionId); // Set the user session ID in the App component
                navigate('/survey/1'); // Navigate to the first survey page
            } else {
                throw new Error('Failed to submit form data');
            }
        } catch (error) {
            console.error("Error submitting form data:", error);
        }
    };

    return (
        <div className="consent-container">
            <div className="consent-form">
                <h1>Consent Form</h1>
                <form onSubmit={handleConsent}>
                    <div className="form-group">
                        <label>Please select your age.</label>
                        <select name="age" value={formData.age} onChange={handleInputChange}>
                            <option value="" disabled>Select your age</option>
                            {ages.map(age => (
                                <option key={age} value={age}>{age}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Please select your gender.</label>
                        <select name="gender" value={formData.gender} onChange={handleInputChange}>
                            <option value="" disabled>Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="withdraw">I do not wish to disclose.</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Please select your highest level of completed education.</label>
                        <select name="education" value={formData.education} onChange={handleInputChange}>
                            <option value="" disabled>Select your education</option>
                            {educations.map(education => (
                                <option key={education} value={education}>{education}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Are you color-blind?</label>
                        <select name="colorBlind" value={formData.colorBlind} onChange={handleInputChange}>
                            <option value="" disabled>Select an option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="maybe">I do not wish to disclose.</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Please select your familiarity with visualization.</label>
                        <select name="familiarity" value={formData.familiarity} onChange={handleInputChange}>
                            <option value="" disabled>Select your familiarity level</option>
                            <option value="not_familiar">I have never created a visualization.</option>
                            <option value="somewhat">I am somewhat familiar.</option>
                            <option value="very_familiar">I have created visualization systems before.</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Please include any additional comments below. (optional)</label>
                        <textarea name="comments" rows={3} value={formData.comments} onChange={handleInputChange}></textarea>
                    </div>

                    <button type="submit">Agree and Start Survey</button>
                </form>
            </div>
        </div>
    );
}

export default ConsentPage;
