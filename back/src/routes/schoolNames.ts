import { Router } from 'express';
import { getAllSchoolNames } from '../controllers/getAllSchoolNames';

const router = Router();

console.log("school names route")

router.get('/schools', getAllSchoolNames);

module.exports = router;

