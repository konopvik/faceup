import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SchoolReports.module.css';

type Report = {
    id: number;
    title: string;
    description: string;
    date: string;
    school: string;
    senderName: string;
    senderAge: number;
};

const SchoolReports: React.FC = () => {
    const { schoolName } = useParams<{ schoolName: string }>();
    const [reports, setReports] = useState<Report[]>([]);
    const [editReport, setEditReport] = useState<Report | null>(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    // Simulated fetching of reports from backend
    const fetchReports = async () => {
        try {
            // Fetch reports from your backend endpoint
            const response = await fetch(`/api/reports?school=${encodeURIComponent(schoolName)}`);
            const data = await response.json();
            setReports(data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [schoolName]);

    // Delete report
    const handleDelete = async (id: number) => {
        try {
            await fetch(`/api/reports/${id}`, { method: 'DELETE' });
            setReports(reports.filter(report => report.id !== id));
        } catch (error) {
            console.error("Error deleting report:", error);
        }
    };

    // Edit report (open form)
    const handleEdit = (report: Report) => {
        setEditReport(report);
        setNewTitle(report.title);
        setNewDescription(report.description);
    };

    // Save changes to the report
    const handleSave = async () => {
        if (editReport) {
            try {
                const updatedReport = { ...editReport, title: newTitle, description: newDescription };
                await fetch(`/api/reports/${editReport.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedReport),
                });
                setReports(reports.map(report => (report.id === editReport.id ? updatedReport : report)));
                setEditReport(null);
            } catch (error) {
                console.error("Error updating report:", error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Reports for {decodeURIComponent(schoolName)}</h1>

            {editReport && (
                <div className={styles.editForm}>
                    <h3>Edit Report</h3>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className={styles.input}
                        placeholder="Edit title"
                    />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className={styles.textarea}
                        placeholder="Edit description"
                    />
                    <button onClick={handleSave} className={styles.saveButton}>Save</button>
                </div>
            )}

            {reports.length > 0 ? (
                <ul className={styles.reportList}>
                    {reports.map((report) => (
                        <li key={report.id} className={styles.reportItem}>
                            <h3>{report.title}</h3>
                            <p>{report.description}</p>
                            <p><strong>Sender:</strong> {report.senderName}, Age: {report.senderAge}</p>
                            <span className={styles.date}>Date: {report.date}</span>
                            <button onClick={() => handleEdit(report)} className={styles.editButton}>Edit</button>
                            <button onClick={() => handleDelete(report.id)} className={styles.deleteButton}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noReports}>No reports found for {decodeURIComponent(schoolName)}.</p>
            )}
        </div>
    );
};

export default SchoolReports;
