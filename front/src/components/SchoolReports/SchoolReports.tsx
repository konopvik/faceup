import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './SchoolReports.module.css';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

const SchoolReports: React.FC = () => {
    const { schoolName } = useParams<{ schoolName: string }>();
    const navigate = useNavigate();
    const [reports, setReports] = useState<Report[]>([]);
    const [editReport, setEditReport] = useState<Report | null>(null);
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newFile, setNewFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalMessage, setModalMessage] = useState<string | null>(null);

    if (!schoolName) {
        return <p className={styles.loading}>Loading school data...</p>;
    }

    const fetchReports = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/schools/${encodeURIComponent(schoolName)}/reports`
            );
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [schoolName]);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/reports/${id}`);
            setReports(reports.filter((report) => report.id !== id));
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    const handleEdit = (report: Report) => {
        setEditReport(report);
        setNewName(report.name);
        setNewAge(report.age.toString());
        setNewFile(null);
    };

    const handleSave = async () => {
        if (editReport) {
            if (!newFile) {
                setModalMessage('You need to upload a file before saving.');
                return;
            }

            try {
                const formData = new FormData();
                formData.append('name', newName);
                formData.append('age', newAge);
                formData.append('file', newFile);

                await axios.put(
                    `${import.meta.env.VITE_BASE_URL}/reports/${editReport.id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                setReports(
                    reports.map((report) =>
                        report.id === editReport.id
                            ? { ...report, name: newName, age: parseInt(newAge, 10) }
                            : report
                    )
                );
                setEditReport(null);
                setNewName('');
                setNewAge('');
            } catch (error) {
                setModalMessage('Error updating report. Please try again.');
                console.error('Error updating report:', error);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewFile(e.target.files[0]);
        }
    };

    const handleDownload = async (id: number) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/reports/${id}/download`,
                {
                    responseType: 'blob',
                }
            );

            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'downloaded_file';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch?.[1]) {
                    fileName = fileNameMatch[1];
                }
            }

            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            setModalMessage('There is no file for downloading');
            console.error('Error downloading file:', error);
        }
    };

    const handleBack = () => {
        navigate(`/reporting/${encodeURIComponent(schoolName)}`);
    };

    const handleCloseModal = () => {
        setModalMessage(null);
        setEditReport(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Reports for {decodeURIComponent(schoolName)}</h1>

            <button
                type="button"
                className={styles.backButton}
                onClick={handleBack}
            >
                Back
            </button>

            {loading ? (
                <Loader />
            ) : reports.length > 0 ? (
                <ul className={styles.reportList}>
                    {reports.map((report) => (
                        <li key={report.id} className={styles.reportItem}>
                            <h3>{report.name}</h3>
                            <p>
                                <strong>Age:</strong> {report.age}
                            </p>
                            <button
                                onClick={() => handleDownload(report.id)}
                                className={styles.downloadButton}
                            >
                                Download File
                            </button>
                            <button
                                onClick={() => handleEdit(report)}
                                className={styles.editButton}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(report.id)}
                                className={styles.deleteButton}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noReports}>
                    No reports found for {decodeURIComponent(schoolName)}.
                </p>
            )}

            <Modal isOpen={!!editReport || !!modalMessage} onClose={handleCloseModal}>
                {modalMessage ? (
                    <p>{modalMessage}</p>
                ) : (
                    <>
                        <h3>Edit Report</h3>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className={styles.input}
                            placeholder="Edit name"
                        />
                        <input
                            type="number"
                            value={newAge}
                            onChange={(e) => setNewAge(e.target.value)}
                            className={styles.input}
                            placeholder="Edit age"
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className={styles.input}
                        />
                        <button onClick={handleSave} className={styles.saveButton}>
                            Save
                        </button>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default SchoolReports;
