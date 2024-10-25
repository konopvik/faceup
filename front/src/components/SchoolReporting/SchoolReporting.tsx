import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to extract school name
import styles from './SchoolReporting.module.css'; // Import your styles

const SchoolReporting: React.FC = () => {
    const navigate = useNavigate();
    const { schoolName } = useParams<{ schoolName: string }>(); // Get the schoolName from the URL

    const handleCreateReport = () => {
        navigate(`/creating-report/${schoolName}`)
    };

    const handleBackToSearch = () => {
        navigate('/');
    };

    const handleShowReports = () => {
        // Navigate to the reports page, passing the school name as a URL parameter
        navigate(`/school-reports/${schoolName}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Test online trust box for {decodeURIComponent(schoolName)}</h1>
            <p className={styles.subtitle}>
                This trust box is not real. However, you can use it to send a test report and see how it works.
            </p>
            <p className={styles.description}>
                Anyone who is a witness or victim of bullying, inappropriate behavior or has a problem they are ashamed
                to talk about personally can reach out through the FaceUp online trust box. The reports are anonymous,
                so students do not have to worry about the report being used against them.
            </p>
            <p className={styles.description}>
                If you want to report a <strong>real case of bullying</strong>, look for your school and send the report
                to that school. In case of a life-threatening situation, call 911.
            </p>

            {/* Buttons at the bottom */}
            <div className={styles.buttons}>
                <button className={styles.createReportButton} onClick={handleCreateReport}>
                    + Create test report
                </button>
                <button className={styles.backButton} onClick={handleBackToSearch}>
                    🔍 Back to searching for school
                </button>
                {/* New button for showing all reports */}
                <button className={styles.showReportsButton} onClick={handleShowReports}>
                    📜 Show reports for {decodeURIComponent(schoolName)}
                </button>
            </div>
        </div>
    );
};

export default SchoolReporting;
