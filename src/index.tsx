import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AdminDashboard from './components/admin/AdminDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/**
 * index.tsx
 * - 메인 엔트리 파일
 * - App 컴포넌트와 AdminDashboard 컴포넌트를 라우팅
 */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Router>
        <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
    </Router>
);
//