import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReportFailure.module.css';

const ReportFailure: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.icon}>❌</div>
            <h1 className={styles.title}>Report Failed</h1>
            <p className={styles.message}>
                Unfortunately, the report submission failed. Please try again later.
            </p>

            <button className={styles.button} onClick={() => navigate('/')}>
                Back to home page
            </button>
        </div>
    );
};

export default ReportFailure;
