import React from 'react';
import styles from './SchoolButton.module.css';

const SchoolButton: React.FC = () => {
    return (
        <div className={styles.buttonContainer}>
            <button className={styles.schoolButton}>
                My primary/secondary school 🎓
            </button>
        </div>
    );
};

export default SchoolButton;
