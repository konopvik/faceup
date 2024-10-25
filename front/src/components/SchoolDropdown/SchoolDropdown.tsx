import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from './SchoolDropdown.module.css';

const SchoolDropdown: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const schools = [
        'Testing school',
        'Another School',
        'School for Innovation',
        'Global School of Learning',
        'The Future Academy',
        'Elite International School',
        'Open Mind School',
        'Creative Learning Center'
    ];

    const handleSelectSchool = (school: string) => {
        setSelectedSchool(school);
        setShowDropdown(false);
        setSearchTerm(''); // Reset search term
    };

    const clearSelectedSchool = () => {
        setSelectedSchool(null);
        setSearchTerm(''); // Reset search term
    };

    // Function to detect clicks outside of the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleContinue = () => {
        if (selectedSchool) {
            // Navigate to the reporting page and pass the selected school in the URL
            const encodedSchool = encodeURIComponent(selectedSchool); // Encode the school name for URL safety
            navigate(`/reporting/${encodedSchool}`);
        } else {
            alert('Please select a school before continuing');
        }
    };

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <label htmlFor="school-search" className={styles.label}>School</label>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    id="school-search"
                    className={styles.input}
                    placeholder="🔍 Find a school"
                    value={selectedSchool || searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                />
                {selectedSchool && (
                    <button className={styles.clearButton} onClick={clearSelectedSchool}>
                        &times;
                    </button>
                )}
            </div>
            {showDropdown && !selectedSchool && (
                <div className={styles.dropdown}>
                    {schools.map((school, index) => {
                        const isMatch = school.toLowerCase().includes(searchTerm.toLowerCase());
                        return (
                            <div
                                key={index}
                                className={`${styles.dropdownItem} ${isMatch ? styles.highlight : ''}`}
                                onClick={() => handleSelectSchool(school)}
                            >
                                {school}
                            </div>
                        );
                    })}
                </div>
            )}
            {/* Continue button */}
            <button
                className={styles.continueButton}
                onClick={handleContinue}
                disabled={!selectedSchool} // Disable the button if no school is selected
            >
                Continue
            </button>
        </div>
    );
};

export default SchoolDropdown;
