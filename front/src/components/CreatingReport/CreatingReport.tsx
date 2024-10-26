import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreatingReport.module.css';

const CreatingReport: React.FC = () => {
    const [senderName, setSenderName] = useState('');
    const [senderAge, setSenderAge] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const { schoolName } = useParams<{ schoolName: string }>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!schoolName) {
            alert('School name is missing.');
            return;
        }

        const formData = new FormData();
        formData.append('name', senderName);
        formData.append('age', senderAge);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/api/schools/${encodeURIComponent(schoolName)}/reports`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            navigate(`/report-success/${encodeURIComponent(schoolName)}`);
        } catch (error) {
            navigate('/report-failure');
        }
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
                        onChange={(e) => setSenderAge(e.target.value)}
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
            </form>
        </div>
    );
};

export default CreatingReport;
