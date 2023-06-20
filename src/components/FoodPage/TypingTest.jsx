import {useState, useEffect} from 'react';

const TypingTest = () => {
    const [title, setTitle] = useState('');
    const completionWord = '오늘 날씨에 맞는 음식점을 추천해드릴께요.';

    useEffect(() => {
        let count = 0;
        const typingInterval = setInterval(() => {
            setTitle(prevTitleValue => {
                const result = prevTitleValue + completionWord[count];

                if (count >= completionWord.length - 1) {
                    clearInterval(typingInterval);
                }

                count++;
                return result;
            });
        }, 300);

        return () => {
            clearInterval(typingInterval);
        };
    }, []); // 빈 배열([])로 의존성 배열 설정

    return <h1 className="main-title">{title}</h1>;
};

export default TypingTest;
