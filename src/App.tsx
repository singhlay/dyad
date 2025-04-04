import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Onboarding from './pages/Onboarding';

function App() {
  const whatWeDoItems = {
    'Practice Foundations': [
      'Practice Assessment',
      'Startup Consulting',
      'Physician Licensing',
      'Physician Credentialing',
      'Facility Credentialing',
      'Payer Enrollment',
      'Payer Contracting'
    ],
    'Pre Encounter': [
      'Eligibility Verification',
      'Benefits Verification',
      'Medical Necessity Reviews',
      'Prior Authorizations',
      'Good Faith Estimate'
    ],
    'Post Encounter': [
      'Charge Capture',
      'Specialty Coding',
      'Charge Reconciliation',
      'Claims Submission'
    ],
    'Claims Management': [
      'Denials & Appeals',
      'Accounts Receivable (AR)',
      'Payment Posting & Reconciliation',
      'Underpayments Recovery',
      'Patient Invoicing'
    ],
    'Specialty Billing': [
      'Personal Injury',
      'Workers Compensation'
    ],
    'Real Time Monitoring & Insights': [
      '24/7 Network Monitoring',
      'CAQH Management',
      'Robust Reporting, Market Analytics, and Benchmarking'
    ]
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar whatWeDoItems={whatWeDoItems} />
        <Routes>
          <Route path="/" element={<Home whatWeDoItems={whatWeDoItems} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;