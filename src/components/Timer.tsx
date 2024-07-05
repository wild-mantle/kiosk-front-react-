import React, { useEffect, useState, useImperativeHandle, forwardRef, Ref } from 'react';

interface TimerProps {
    onTimeUp?: () => void;
}

const Timer = forwardRef((props: TimerProps, ref: Ref<{ resetTimer: () => void }>) => {
    const [timeLeft, setTimeLeft] = useState(30);

    useImperativeHandle(ref, () => ({
        resetTimer() {
            setTimeLeft(30);
        }
    }));

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else if (props.onTimeUp) {
            props.onTimeUp();
        }
    }, [timeLeft, props]);

    return (
        <div className="timer">
            <h2>남은시간</h2>
            <p>{timeLeft}초</p>
        </div>
    );
});

export default Timer;
