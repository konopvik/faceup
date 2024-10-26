import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'
import 'dotenv/config';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api', require('./routes/schoolNames'))
app.use('/api', require('./routes/newReport'))
app.use('/api', require('./routes/reports'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
