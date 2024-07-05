import React, { useEffect, useState } from 'react';

const Timer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    return (
        <div className="timer">
            <h2>남은시간</h2>
            <p>{timeLeft}초</p>
        </div>
    );
}

export default Timer;