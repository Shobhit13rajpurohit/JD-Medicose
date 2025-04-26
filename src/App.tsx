import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DoctorSchedule from './pages/DoctorSchedule';
import SymptomsChecker from './pages/SymptomsChecker';
import Gallery from './pages/Gallery';
import Feedback from './pages/Feedback';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctor-schedule" element={<DoctorSchedule />} />
            <Route path="/symptoms-checker" element={<SymptomsChecker />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;