import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DesignationView from './components/DesignationView';
import EmployeeView from './components/EmployeeView';

export default function App() {
  const [activeTab, setActiveTab] = useState('employee'); // 'employee' or 'designation'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1, padding: '32px 40px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {activeTab === 'designation' ? (
          <DesignationView />
        ) : (
          <EmployeeView />
        )}
      </main>


    </div>
  );
}
