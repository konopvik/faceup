import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreatingReport.module.css';
import Modal from '../Modal/Modal';

const CreatingReport: React.FC = () => {
    const [senderName, setSenderName] = useState('');
    const [senderAge, setSenderAge] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { schoolName } = useParams<{ schoolName: string }>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (parseInt(value, 10) >= 0 || value === '') {
            setSenderAge(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!schoolName) {
            setModalMessage('School name is missing.');
            return;
        }

        if (parseInt(senderAge, 10) < 0) {
            setModalMessage('Age cannot be less than 0.');
            return;
        }

        const formData = new FormData();
        formData.append('name', senderName);
        formData.append('age', senderAge);
        if (file) {
            formData.append('file', file);
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/schools/${encodeURIComponent(schoolName)}/reports`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            navigate(`/report-success/${encodeURIComponent(schoolName)}`);
        } catch (error) {
            setModalMessage('An error occurred while submitting the report. Please try again.');
        }
    };

    const handleBack = () => {
        if (schoolName) {
            navigate(`/reporting/${encodeURIComponent(schoolName)}`);
        }
    };

    const handleCloseModal = () => {
        setModalMessage(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>New report</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="senderName" className={styles.label}>
                        Name <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        id="senderName"
                        className={styles.input}
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Enter sender's name"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="senderAge" className={styles.label}>
                        Age <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        id="senderAge"
                        className={styles.input}
                        value={senderAge}
                        onChange={handleAgeChange}
                        placeholder="Enter sender's age"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fileUpload" className={styles.label}>
                        Add file
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        className={styles.input}
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Send
                </button>
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={handleBack}
                >
                    Back
                </button>
            </form>

            <Modal isOpen={modalMessage !== null} onClose={handleCloseModal}>
                <p>{modalMessage}</p>
            </Modal>
        </div>
    );
};

export default CreatingReport;
