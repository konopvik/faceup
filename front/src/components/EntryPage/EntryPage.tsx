import React from 'react';
import SchoolButton from "../SchoolButton/SchoolButton.tsx";
import SchoolDropdown from "../SchoolDropdown/SchoolDropdown.tsx";
import styles from './EntryPage.module.css';

const EntryPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <SchoolButton/>
            <SchoolDropdown/>
        </div>
    );
};

export default EntryPage;