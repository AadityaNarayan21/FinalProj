import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';       // Import your main page component
import SoilDataTable from './SoilDataTable';  // Import your SoilDataTable component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/soil-data" element={<SoilDataTable />} />
      </Routes>
    </Router>
  );
}

export default App;
