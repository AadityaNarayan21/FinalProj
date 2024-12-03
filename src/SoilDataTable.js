import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SoilDataTable = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { gridNumber } = location.state || { gridNumber: 'Grid 1' };

  useEffect(() => {
    fetch('http://localhost:5000/api/soil-data')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.map(({ _id, ph, rainfall, label, ...rest }) => rest); // Filter out unnecessary fields
        setData(filteredData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#0A2540', minHeight: '100vh', color: 'white' }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')} 
        style={{ 
          marginBottom: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#1A3A60', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          textAlign: 'left'  // Align button to the left
        }}
      >
        Back to Main Page
      </button>

      {/* Google Translate Widget */}
      <div id="google_translate_element" style={{ marginBottom: '20px', textAlign: 'left' }}></div>

      {/* Display Grid Number (Centered) */}
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{gridNumber}</h2>

      {/* Soil Data Grid Container */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column', 
        width: '100%' 
      }}>
        {/* Soil Data Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${data.length > 0 ? Object.keys(data[0]).length : 0}, 1fr)`, 
          gap: '10px', 
          maxWidth: '900px', // Adjusted width
          width: '100%'      // Responsive width
        }}>
          {/* Table Headers */}
          {data.length > 0 && Object.keys(data[0]).map((key) => (
            <div key={key} style={{ 
              fontWeight: 'bold', 
              borderBottom: '2px solid white', 
              padding: '10px', 
              textAlign: 'center', 
              fontSize: '30px' // Increased font size for headers
            }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
          ))}

          {/* Display Data Rows */}
          {data.map((item, rowIndex) => (
            Object.values(item).map((value, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} style={{ 
                padding: '10px', 
                backgroundColor: '#1A3A60', 
                borderRadius: '5px', 
                textAlign: 'center',
                fontSize: '24px' // Increased font size for data
              }}>
                {value}
              </div>
            ))
          ))}
        </div>

        {/* Deficiency Message */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <p 
            style={{ 
              fontSize: '24px',           // Increased font size
              color: 'white', 
              backgroundColor: '#1A3A60', 
              padding: '20px',            
              borderRadius: '10px',       
              textAlign: 'center',
              width: '80%'                
            }}
          >
            The soil in this grid is currently deficient in nitrogen. It is recommended to apply <strong>Calcium Ammonium Nitrate</strong> (CAN) to address this deficiency and promote optimal plant growth.
          </p>
        </div>
      </div>

      {/* Load Google Translate Script */}
      <script type="text/javascript">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'kn,en' }, 'google_translate_element');
          }
        `}
      </script>
      <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    </div>
  );
};

export default SoilDataTable;
