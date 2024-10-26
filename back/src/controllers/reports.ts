import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();

// Configure multer for file uploads (store file in memory for easy access)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Get all reports from a specific school
export const getReportsFromSchool = async (req: Request, res: Response): Promise<void> => {
    const schoolName = decodeURIComponent(req.params.schoolName);

    try {
        const school = await prisma.schoolName.findUnique({
            where: {
                name: schoolName,
            },
        });

        if (!school) {
            res.status(404).json({ message: `School with name ${schoolName} not found` });
            return;
        }

        const reports = await prisma.report.findMany({
            where: {
                schools: {
                    some: {
                        id: school.id,
                    },
                },
            },
        });

        res.status(200).json(reports);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Edit a specific report
export const editReport = async (req: Request, res: Response): Promise<void> => {
    const reportId = parseInt(req.params.reportId, 10);
    const { name, age } = req.body;
    const file = req.file;

    try {
        // Prepare the data for the update
        const updateData: any = {
            name,
            age: parseInt(age, 10),
        };

        // If a new file is provided, update file, fileName, and fileType
        if (file) {
            updateData.file = file.buffer;
            updateData.fileName = file.originalname;
            updateData.fileType = file.mimetype;
        }

        const updatedReport = await prisma.report.update({
            where: {
                id: reportId,
            },
            data: updateData,
        });

        res.status(200).json(updatedReport);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};


// Delete a specific report
export const deleteReport = async (req: Request, res: Response): Promise<void> => {
    const reportId = parseInt(req.params.reportId, 10);

    try {
        await prisma.report.delete({
            where: {
                id: reportId,
            },
        });

        res.status(204).send(); // Send a no-content status indicating successful deletion
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Download a file associated with a specific report
export const downloadReportFile = async (req: Request, res: Response): Promise<void> => {
    const reportId = parseInt(req.params.reportId, 10);

    try {
        const report = await prisma.report.findUnique({
            where: { id: reportId },
        });

        if (!report || !report.file || !report.fileName || !report.fileType) {
            res.status(404).json({ message: 'File not found for the specified report.' });
            return;
        }

        // Set headers for file download
        res.setHeader('Content-Disposition', `attachment; filename="${report.fileName}"`);
        res.setHeader('Content-Type', report.fileType);

        // Send the file data
        res.send(report.file);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};