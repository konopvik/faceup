import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ReportSuccess.module.css';

const ReportSuccess: React.FC = () => {
    const { schoolName } = useParams<{ schoolName: string }>(); // Get the schoolName from params
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.icon}>✔️</div>
            <h1 className={styles.title}>Report was sent</h1>
            <p className={styles.message}>
                You chose "{decodeURIComponent(schoolName)}" as an option, this helps you see how the reporting form works.
                If you want to report a real case of bullying, find your school and send a report to them. In the event of
                a life-threatening situation, call 911.
            </p>

            <button className={styles.button} onClick={() => navigate('/')}>
                Back to home page
            </button>
        </div>
    );
};

export default ReportSuccess;
