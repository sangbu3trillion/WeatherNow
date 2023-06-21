import React from 'react';
import './css/loding.css';
// import styles from './css/Loding.module.css';

export default function Loading() {
    return (
        <>
            <div className={`grid place-items-center my-80`}>
                <p className={`font-gb text-7xl`}>날씨 어때요?</p>
            </div>
        </>
        // <>
        //     <div className={`grid place-items-center my-80 ${styles.div}`}>
        //         <p className={`font-gb text-7xls ${styles.p}`}>날씨 어때요?</p>
        //     </div>
        // </>
    );
}
