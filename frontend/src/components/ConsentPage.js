import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/ConsentPage.css';

function ConsentPage({ setUserSessionId }) {
    const navigate = useNavigate();

    const handleConsent = async () => {
        try {
            const response = await fetch('http://localhost:3000/submit-consent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Assuming the server expects the consent agreement in the request.
                // Modify as per server's requirement.
                body: JSON.stringify({ consentAgreed: true }),
            });
            if (response.ok) {
                const result = await response.json();
                setUserSessionId(result.userSessionId); // Set the user session ID in the App component
                navigate('/survey-instruction'); // Navigate to the survey instruction page
            } else {
                throw new Error('Failed to submit consent agreement');
            }
        } catch (error) {
            console.error("Error submitting consent agreement:", error);
        }
    };


    return (
        <div className="consent-container">
            <div className="consent-form">
                <h1>Research Study Consent Form</h1>
                <div className="consent-text">
                    <p>We invite you to participate in a research study being conducted by investigators from Washington
                        University in St. Louis. You are being asked to participate in this research study because you
                        are an English-speaking adult in the United States. The purpose of the study is to develop an
                        instrument that measures how well people can read, understand, and use data visualizations to
                        solve problems. <br/>
                        If you agree to participate, we would like you to questions about a series of data
                        visualization. Initially, you will be engaged in the analysis of these visualizations. For each
                        item, a data visualization paired with a corresponding problem will be presented. Additionally,
                        a GPT-generated response will be provided as a point of reference. Your task involves evaluating
                        the GPT's response and deciding whether to adopt it as is, modify it, or craft an entirely new
                        response. Following the completion of 15 analysis-based questions, the survey will transition to
                        multiple-choice questions.For each question, you will see a data visualization and a problem to
                        solve. Choose the BEST answer to the questions. If you are unsure, Select ''Skip'' instead of
                        guessing. You are also free to skip any questions that you prefer not to answer. In the end, you
                        will complete a brief demographic survey. <br/>
                        We would like to use the data we are obtaining in this study for studies going on right now as
                        well as studies that are conducted in the future. These studies may provide additional
                        information that will be helpful in developing better visual communication tools. <br/>
                        It is unlikely that what we learn from these studies will have a direct benefit to you. There
                        are no plans to provide financial compensation to you should this occur. By allowing us to use
                        your data you give up any property rights you may have in the data. We will share your data with
                        other researchers. They may be doing research in areas similar to this research or in other
                        unrelated areas. These researchers may be at Washington University, at other research centers
                        and institutions, or industry sponsors of research. We may also share your research data with
                        large data repositories (a repository is a database of information) for broad sharing with
                        the research community. If your individual research data is placed in one of these repositories
                        only qualified researchers, who have received prior approval from individuals that monitor the
                        use of the data, will be able to look at your information. <br/>
                        Your data will be stored without your name or any other kind of link that would enable us to
                        identify which data are yours. Therefore, it will be available indefinitely for use in future
                        research studies without your additional consent and cannot be removed. <br/>
                        There are no known risks from being in this study. <br/>
                        You will not benefit personally. However, we hope that others may benefit in the future from
                        what we learn as a result of this study. <br/>
                        You will not have any costs for being in this research study. <br/>
                        You will be paid for being in this research study. You will receive a pay of $8 for completing
                        this quiz. At the end of the study, copy your survey code back to Prolific to receive your
                        payment. We will keep the information you provide confidentially. This survey is completely
                        anonymous; we will not collect any personally identifiable information. We will only have access
                        to your Prolific ID only, which we will use solely for payment purposes. <br/>
                        Any report or article that we write will not include information that can directly identify you.
                        The journals that publish these reports or articles require that we share the information that
                        was collected for this study with others to make sure the results of this study are correct and
                        help develop new ideas for research. Your information will be shared in a way that cannot
                        directly identify you. <br/>
                        Federal regulatory agencies and Washington University, including the Washington University
                        Institutional Review Board (a committee that reviews and approves research studies) and the
                        Human Research Protection Office, may inspect and copy records pertaining to this research. Your
                        participation in this study is completely voluntary. You may choose not to take part at all.
                        If you decide to participate in the study, you may stop participating at any time. Any data that
                        was collected as part of this study will remain as part of the study records and cannot be
                        removed. If you decide not to take part in the study or if you stop participating at any time,
                        you won’t be penalized or lose any benefits for which you otherwise qualify. If you do not wish
                        to participate in this study or want to end your participation in the study, close the browser
                        tab without answering any of the questions. <br/>
                        We encourage you to ask questions. If you have any questions about the research study itself,
                        please contact Hangxiao Zhu (hangxiao@wustl.edu). If you feel you have been harmed from being in
                        the study, please contact Alvitta Ottley (alvitta@wustl.edu). If you have questions, concerns,
                        or complaints about your rights as a research participant, please contact the Human Research
                        Protection Office at 1-(800)-438-0445 or email hrpo@wustl.edu. General information about being
                        a research participant can be found on the Human Research Protection Office website,
                        http://hrpo.wustl.edu. To offer input about your experiences as a research participant or to
                        speak to someone other than the research staff, call the Human Research Protection Office at
                        the number above. <br/>
                        Thank you very much for your consideration of this research study.</p>
                </div>
                <button className="consent-button" onClick={handleConsent}>Agree and Start Survey</button>
            </div>
        </div>
    );
}

export default ConsentPage;
