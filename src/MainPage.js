import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  // Define an array for 9 grid labels
  const gridLabels = Array.from({ length: 9 }, (_, i) => `Grid ${i + 1}`);

  return (
    <div style={{ 
      backgroundColor: '#0A2540', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: 'white',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '40px' }}>Welcome to the Soil Data App</h1>
      
      {/* Centered Grid Container */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '15px', 
        backgroundColor: '#1A3A60',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
      }}>
        {gridLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => navigate('/soil-data', { state: { gridNumber: label } })}
            style={{
              backgroundColor: '#4A90E2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '20px',
              fontSize: '18px',
              cursor: 'pointer',
              textAlign: 'center',
              minWidth: '80px',
              minHeight: '80px',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
