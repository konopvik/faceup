import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSchoolNames = async (req: Request, res: Response): Promise<void> => {
    try {
        const schoolNames = await prisma.schoolName.findMany({
            select: {
                name: true,
            },
        });

        res.status(200).json(schoolNames);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
