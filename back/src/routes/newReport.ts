import { Router } from 'express';
import { postNewReport } from '../controllers/postNewReport';
import { upload } from '../middleware/upload';

const router = Router();

// Define the POST route, assuming the school name is in the URL
router.post('/schools/:schoolName/reports', upload.single('file'), postNewReport);


module.exports = router;
