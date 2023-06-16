import React from 'react';
import styles from './css/Loding.module.css';

export default function Loding() {
    return (
        <>
            <style>@import url('https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap');</style>
            <div className={`grid place-items-center my-80 ${styles.div}`}>
                <p className={`font-gb text-7xl ${styles.p}`}>날씨 어때요?</p>
            </div>
        </>
    );
}
