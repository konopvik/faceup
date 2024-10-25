import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CreatingReport.module.css';

const CreatingReport: React.FC = () => {
    const [category, setCategory] = useState('');
    const [whoNeedsHelp, setWhoNeedsHelp] = useState('');
    const [classInput, setClassInput] = useState('');
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isSuccess = true;

        if (isSuccess) {
            navigate(`/report-success/${encodeURIComponent(schoolName)}`);
        } else {
            navigate('/report-failure');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>New report</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Sender Name Field */}
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

                {/* Sender Age Field */}
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

                {/* File Upload */}
                <div className={styles.formGroup}>
                    <label htmlFor="fileUpload" className={styles.label}>
                        Nahrát soubor
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        className={styles.input}
                        onChange={handleFileChange}
                    />
                </div>

                {/* Other fields (Category, Who Needs Help, Class) */}
                {/* ...rest of your form fields... */}

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default CreatingReport;
