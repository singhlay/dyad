import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Onboarding from './pages/Onboarding';
import ServiceModal from './components/ServiceModal';
import CustomCursor from './components/CustomCursor';
import AboutModal from './components/AboutModal';
import { img1 , img2 , img3 ,img4, img5, img6} from './assets/images';

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
   const [selectedServiceAbout, setSelectedServiceAbout] = useState<string | null>(null);

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
      'Medical Necessity Review',
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
      'Payment Posting ',
      'Payment Reconciliation',
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
      'Market Analytics & Benchmarking'
    ]
  };

  const aboutUsItems = [
    {
      title: "Our Story & Inspiration",
      detail: "The origins and purpose",
      description:
        "In 1908, William J. Mayo hired Harry Harwick to manage the business and operations of the Mayo Clinic, pioneering a new leadership model in healthcare: the Dyad. At its core, a Dyad is a partnership—a seamless collaboration between a physician leader and a non-physician business expert to elevate patient care and practice performance. Inspired by this model, Dyad Practice Solutions was founded to bring the same partnership-driven approach to modern practice management, combining industry expertise, technology, and strategy to simplify operations and preserve physician autonomy.",
      image: img1,
    },
    {
      title: "Clarity & Accountability",
      detail: "Partnership through integrity and transparency",
      description:
        "The Dyad partnership-driven model is built on a fiduciary commitment, providing integrity and transparency in every engagement. We deliver measurable outcomes that support practices in optimizing operations while ensuring they remain in control.",
      image: img2,
    },
    {
      title: "Innovative Technology",
      detail: "Integrated risk controls and optimized workflows",
      description:
        "Technology alone isn't enough—it's how it's applied that makes the difference. Dyad integrates AI, automation, and data-driven insights with industry expertise to improve workflows, reduce inefficiencies, and strengthen practice operations—all with expert oversight to ensure accuracy and reliability.",
      image: img3,
    },
    {
      title: "Empowering Physician Autonomy",
      detail: "Empowering independent practices with scalable solutions",
      description:
        "Running an independent practice means more than delivering patient care—it requires coordinating vendors, ensuring service quality, and holding third parties accountable. Without the right support, these essential responsibilities can become inefficient and costly. Dyad operates as an extension of the practice, delivering value, exceptional service, and measurable results. Built on a fiduciary commitment, we provide the expertise, structure, and transparency physicians need to operate with confidence, navigate challenges, and sustain long-term success.",
      image: img4,
    },
    {
      title: "Why Dyad",
      detail: "Expertise, execution, and strategic support",
      description:
        "Dyad integrates industry expertise, technology, and structured risk controls to create stability, efficiency, and accountability in practice operations. Risk controls at Dyad are proactive measures designed to ensure accuracy in billing, regulatory compliance, and operational continuity. Rather than offering fragmented, à la carte services, we take an integrated approach—delivering a seamless, structured framework that enhances efficiency, ensures consistency, and drives measurable outcomes. Our fiduciary approach ensures every solution aligns with the best interests of the practice.",
      image: img5,
    },
    {
      title: "Our Process",
      detail: "Streamlined for efficiency from day one",
      description:
        "A streamlined approach designed for efficiency and success from day one of our partnership.",
      image: img6,
      link: "/onboarding",
    },
  ];

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
  };

  const handleAboutClick = (about: string) => {
    setSelectedServiceAbout(about);
  };

  return (
    <Router >
      <div className="min-h-screen bg-white cursor-custom">
      <CustomCursor />
        <Navbar whatWeDoItems={whatWeDoItems} aboutUsItems={aboutUsItems}  onServiceClick={handleServiceClick} onAboutClick={handleAboutClick}/>
        <Routes>
          <Route path="/" element={<Home whatWeDoItems={whatWeDoItems} 
           aboutUsItems={aboutUsItems} 
                selectedServiceAbout={selectedServiceAbout}
                setSelectedServiceAbout={setSelectedServiceAbout}/>} />
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
        {selectedServiceAbout && (
              <AboutModal
                isOpen={true}
                onClose={() => setSelectedServiceAbout(null)}
                title={selectedServiceAbout}
                description={
                  aboutUsItems.find(item => item.title === selectedServiceAbout)?.description || ''
                }
              />
            )}
      </div>
    </Router>
  );
}

export default App;