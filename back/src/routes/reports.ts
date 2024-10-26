import { Router } from 'express';
import {getReportsFromSchool, editReport, deleteReport, upload, downloadReportFile} from '../controllers/reports';

const router = Router();

// Get all reports from a school
router.get('/schools/:schoolName/reports', getReportsFromSchool);

// Edit a report (assuming form data including file is sent)
router.put('/reports/:reportId', upload.single('file'), editReport);

// Delete a report
router.delete('/reports/:reportId', deleteReport);

// Download a file associated with a report
router.get('/reports/:reportId/download', downloadReportFile);

module.exports = router;
