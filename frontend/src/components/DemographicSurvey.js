import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/DemographicSurvey.css';

function DemographicSurvey({ userSessionId }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        education: '',
        familiarity: '',
        aiExperience: '',
        aiTrust: '',
        employmentStatus: '',
        industryRelated: '',
        comments: ''
    });

    // Generate ages 18 to 65
    const ages = Array.from({ length: 48 }, (_, i) => (18 + i).toString());

    const educations = [
        'High School Diploma / GED',
        'Associate Degree',
        'Bachelors Degree',
        'Masters Degree',
        'Doctorate Degree'
    ];

    const employmentStatuses = [
        'Full-time',
        'Part-time',
        'Unemployed',
        'Retired',
        'Prefer not to say'
    ];

    useEffect(() => {
        // Push a new entry into the history stack
        window.history.pushState(null, null, window.location.pathname);

        // Handle back button or back navigation
        const handleBack = (event) => {
            event.preventDefault(); // Prevent default back behavior

            // Display an alert message
            alert("You cannot go back during the survey.");
        };

        // Add event listener for popstate
        window.addEventListener('popstate', handleBack);

        // Cleanup function
        return () => {
            window.removeEventListener('popstate', handleBack);
        };
    }, [navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const isFormComplete = formData.age && formData.gender && formData.education && formData.familiarity && formData.aiExperience && formData.aiTrust;

    const handleDemographicSurveySubmit = async (event) => {
        event.preventDefault();
        const demographicData = formData; // Get the demographic data from the form state
        try {
            const response = await fetch('http://13.59.246.19/api/submit-demographic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userSessionId, demographicData }), // Send userSessionId and demographicData
            });
            if (response.ok) {
                console.log('Demographic data submitted successfully');
                navigate('/survey-instruction'); // Navigate to the experiment instruction page
            } else {
                throw new Error('Failed to submit demographic data');
            }
        } catch (error) {
            console.error("Error submitting demographic data:", error);
        }
    };

    return (
        <div className="demographic-container">
            <div className="demographic-form">
                <h1>Demographic Survey</h1>
                <form onSubmit={handleDemographicSurveySubmit}>
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
                        <label>What is your current employment status?</label>
                        <select name="employmentStatus" value={formData.employmentStatus} onChange={handleInputChange}>
                            <option value="" disabled>Select your employment status</option>
                            {employmentStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Is your current work or field of study related to data analysis, visualization, or artificial intelligence?</label>
                        <select name="industryRelated" value={formData.industryRelated} onChange={handleInputChange}>
                            <option value="" disabled>Select an option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="unsure">Unsure</option>
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
                        <label>Please select your experience with AI systems.</label>
                        <select name="aiExperience" value={formData.aiExperience} onChange={handleInputChange}>
                            <option value="" disabled>Select your experience level</option>
                            <option value="not_familiar">I have never used an AI system.</option>
                            <option value="somewhat">I am somewhat familiar.</option>
                            <option value="very_familiar">I have used AI systems before.</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Please select your trust in AI systems generally.</label>
                        <select name="aiTrust" value={formData.aiTrust} onChange={handleInputChange}>
                            <option value="" disabled>Select your trust level</option>
                            <option value="not_trust">I do not trust AI systems.</option>
                            <option value="somewhat_trust">I somewhat trust AI systems.</option>
                            <option value="trust">I trust AI systems.</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Please include any additional comments below. (optional)</label>
                        <textarea name="comments" rows={3} value={formData.comments}
                                  onChange={handleInputChange}></textarea>
                    </div>

                    <button type="submit" disabled={!isFormComplete}>Agree and Submit Survey</button>
                </form>
            </div>
        </div>
    );
}

export default DemographicSurvey;
