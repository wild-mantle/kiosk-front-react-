// src/components/KioskSelectionPage.tsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Kiosk {
    id: number;
    number: string;
}

const KioskSelectionPage: React.FC = () => {
    const [kiosks, setKiosks] = useState<Kiosk[]>([]);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKiosks = async () => {
            try {
                const adminId = localStorage.getItem('adminId');
                console.log('adminId:', adminId); // 콘솔에 adminId 출력
                if (!adminId) {
                    console.error('No adminId found in localStorage');
                    return;
                }
                const response = await axios.get(`http://localhost:8080/api/kiosks/${adminId}/kiosks`);
                console.log('Fetched kiosks:', response.data); // 콘솔에 fetched kiosks 출력
                setKiosks(response.data);
            } catch (error) {
                console.error('Failed to fetch kiosks', error);
            }
        };

        fetchKiosks();
    }, []);

    const handleKioskSelect = (kiosk: Kiosk) => {
        console.log('Selected kiosk:', kiosk); // 콘솔에 선택한 키오스크 출력
        authContext?.setKioskInfo(kiosk);
        navigate('/guard');
    };

    return (
        <div>
            <h2>키오스크 선택</h2>
            <ul>
                {kiosks.map((kiosk) => (
                    <li key={kiosk.id} onClick={() => handleKioskSelect(kiosk)}>
                        {kiosk.number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KioskSelectionPage;
