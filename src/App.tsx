import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Onboarding from './pages/Onboarding';
import ServiceModal from './components/ServiceModal';

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

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

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar whatWeDoItems={whatWeDoItems} onServiceClick={handleServiceClick} />
        <Routes>
          <Route path="/" element={<Home whatWeDoItems={whatWeDoItems} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
        {selectedService && (
          <ServiceModal
            isOpen={true}
            onClose={() => setSelectedService(null)}
            service={{
              title: selectedService,
              items: whatWeDoItems[selectedService as keyof typeof whatWeDoItems],
              detail: ''
            }}
          />
        )}
      </div>
    </Router>
  );
}

export default App;