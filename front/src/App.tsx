import './App.module.css'
import EntryPage from "./components/EntryPage/EntryPage.tsx";
import SchoolReporting from "./components/SchoolReporting/SchoolReporting.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreatingReport from "./components/CreatingReport/CreatingReport.tsx";
import ReportFailure from "./components/ReportFailure/ReportFailure.tsx";
import ReportSuccess from "./components/ReportSuccess/ReportSuccess.tsx";
import SchoolReports from "./components/SchoolReports/SchoolReports.tsx";


const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EntryPage />} />
                <Route path="/reporting/:schoolName" element={<SchoolReporting />} />
                <Route path="/creating-report/:schoolName" element={<CreatingReport />} />
                <Route path="/report-success/:schoolName" element={<ReportSuccess />} />
                <Route path="/report-failure" element={<ReportFailure />} />
                <Route path="/school-reports/:schoolName" element={<SchoolReports />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
