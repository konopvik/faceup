import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './SchoolReports.module.css';

type Report = {
    id: number;
    name: string;
    age: number;
    file?: string; // Placeholder for file data or URL if you display it
};

const SchoolReports: React.FC = () => {
    const { schoolName } = useParams<{ schoolName: string }>();
    const [reports, setReports] = useState<Report[]>([]);
    const [editReport, setEditReport] = useState<Report | null>(null);
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState('');
    const [newFile, setNewFile] = useState<File | null>(null);

    // Fetch reports from the backend
    const fetchReports = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/schools/${encodeURIComponent(schoolName)}/reports`
            );
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [schoolName]);

    // Delete report
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/reports/${id}`);
            setReports(reports.filter((report) => report.id !== id));
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    // Edit report (open form)
    const handleEdit = (report: Report) => {
        setEditReport(report);
        setNewName(report.name);
        setNewAge(report.age.toString());
    };

    // Save changes to the report
    const handleSave = async () => {
        if (editReport) {
            try {
                const formData = new FormData();
                formData.append('name', newName);
                formData.append('age', newAge);
                if (newFile) {
                    formData.append('file', newFile); // Attach the new file if one was selected
                }

                await axios.put(
                    `http://localhost:3000/api/reports/${editReport.id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                // Update the reports list
                setReports(
                    reports.map((report) =>
                        report.id === editReport.id
                            ? { ...report, name: newName, age: parseInt(newAge, 10) }
                            : report
                    )
                );
                setEditReport(null);
            } catch (error) {
                console.error('Error updating report:', error);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewFile(e.target.files[0]);
        }
    };

    // Download the file associated with a report
    const handleDownload = async (id: number) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/reports/${id}/download`,
                {
                    responseType: 'blob', // Handle binary data
                }
            );

            // Extract the filename from the Content-Disposition header
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'downloaded_file';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch?.[1]) {
                    fileName = fileNameMatch[1];
                }
            }

            // Create a link element to download the file
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Use the extracted filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
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
                </div>
            )}

            {reports.length > 0 ? (
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
        </div>
    );
};

export default SchoolReports;
