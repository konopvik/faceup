// In controllers/reports.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const postNewReport = async (req: Request, res: Response): Promise<void> => {
    const { name, age } = req.body;
    const schoolName = decodeURIComponent(req.params.schoolName);
    const file = req.file;

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

        const newReport = await prisma.report.create({
            data: {
                name,
                age: parseInt(age, 10),
                file: file ? file.buffer : undefined,
                fileName: file ? file.originalname : undefined, // Save original file name
                fileType: file ? file.mimetype : undefined, // Save MIME type
                schools: {
                    connect: { id: school.id },
                },
            },
        });

        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};
