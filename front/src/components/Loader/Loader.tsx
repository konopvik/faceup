import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                width="50"
                height="50"  /* Adjust the size here */
            >
                <circle fill="#60A5FA" stroke="#60A5FA" strokeWidth="15" r="15" cx="40" cy="65">
                    <animate
                        attributeName="cy"
                        calcMode="spline"
                        dur="2s"
                        values="65;135;65;"
                        keySplines=".5 0 .5 1;.5 0 .5 1"
                        repeatCount="indefinite"
                        begin="-0.4s"
                    />
                </circle>
                <circle fill="#60A5FA" stroke="#60A5FA" strokeWidth="15" r="15" cx="100" cy="65">
                    <animate
                        attributeName="cy"
                        calcMode="spline"
                        dur="2s"
                        values="65;135;65;"
                        keySplines=".5 0 .5 1;.5 0 .5 1"
                        repeatCount="indefinite"
                        begin="-0.2s"
                    />
                </circle>
                <circle fill="#60A5FA" stroke="#60A5FA" strokeWidth="15" r="15" cx="160" cy="65">
                    <animate
                        attributeName="cy"
                        calcMode="spline"
                        dur="2s"
                        values="65;135;65;"
                        keySplines=".5 0 .5 1;.5 0 .5 1"
                        repeatCount="indefinite"
                        begin="0s"
                    />
                </circle>
            </svg>
        </div>
    );
};

export default Loader;
