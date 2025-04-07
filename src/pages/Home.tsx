import React, { useEffect, useState } from 'react';
import { ChevronRightCircle as CircleChevronRight, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LogoDark, img1, img2, img3, img4, img5, img6 } from '../assets/images/index.js';
import ServiceModal from '../components/ServiceModal.js';

interface HomeProps {
  whatWeDoItems: Record<string, string[]>;
}

interface ServiceCardProps {
  title: string;
  detail: string;
  image: string;
  link?: string;
  onClick?: () => void;
}

// Fix 1: Update the AboutModal interface to match what you're actually using
interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;  // Changed from 'details' to 'description'
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-body p-4 text-center">
          <h3 className="modal-title mb-2 font-semibold text-xl">{title}</h3>
          <p className="modal-description text-gray-600 clamped-text text-lg" lang="en">{description}</p>
        </div> 
      </div>
    </div>
  );
};


const ServiceCard: React.FC<ServiceCardProps> = ({ title, detail, image, link, onClick }) => {
  return (
    <div className="service-card">
      <img 
        src={image}
        alt={title}
        className="service-image"
      />
      <div className="service-content">
        <h3 className="text-[20px] md:text-[24px] font-semibold mb-3">{title}</h3>
        <div className='flex justify-between'>
          <p className="text-gray-600 mb-4">{detail}</p>
          {link ? (
            <Link to={link} className="service-learn-more">
              <CircleChevronRight />
            </Link>
          ) : (
            <button className="service-learn-more" onClick={onClick}>
              <CircleChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const serviceDetails = {
  'Practice Foundations': {
    title: 'Practice Foundations',
    items: [
      'Payer Contracting',
      'Practice Assessment',
      'Startup Consulting',
      'Facility Credentialing',
      'Physician Credentialing',
      'Physician Licensing'
    ],
    detail: "Startup support, compliance, and credentialing",
  },
  'Pre Encounter': {
    title: 'Pre Encounter',
    detail: "Eligibility verifications, prior-authorizations & patient estimates",
    items: [
      'Eligibility Verification',
      'Benefits Verification',
      'Medical Necessity Reviews',
      'Prior Authorizations',
      'Good Faith Estimate'
    ]
  },
  'Post Encounter': {
    title: 'Post Encounter',
    detail: "Precision driven charge capture, specialty coding & claims submission",
    items: [
      'Charge Capture',
      'Specialty Coding',
      'Claims Documentation',
      'Claims Submission'
    ]
  },
  'Claims Management': {
    title: 'Claims Management',
    detail: "Expedited submissions, resolutions & real-time tracking",
    items: [
      'Denials & Appeals',
      'Accounts Receivable (AR)',
      'Payment Posting & Reconciliation',
      'Underpayments Recovery',
      'Rebill Processing'
    ]
  },
  'Specialty Billing': {
    title: 'Specialty Billing',
    detail: "Expert lien management for complex cases",
    items: [
      'Personal Injury',
      'Workers Compensation'
    ]
  },
  'Real Time Monitoring & Insights': {
    title: 'Real Time Monitoring & Insights',
    detail: "Credentialing alerts, reporting & strategic insights",
    items: [
      '24/7 Network Monitoring',
      'CAQH Management',
      'Robust Reporting, Market Analytics, and Benchmarking'
    ]
  }
};

const aboutUsCards = [
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

const Home: React.FC<HomeProps> = ({ whatWeDoItems }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedServiceAbout, setSelectedServiceAbout] = useState<string | null>(null);
  
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <section className="hero-section flex justify-center items-end text-white pt-24 md:pt-32">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <h1 className="text-[36px] md:text-[48px] lg:text-[60px] leading-[1.2] mb-4 md:mb-6 text-center transition-all duration-500 hover:scale-110 font-semibold">
            A Bold Partnership Model<br />
            For Smarter Healthcare Operations
          </h1>
          <p className="text-[16px] md:text-[18px] lg:text-[24px] mb-8 clamped-text transition-all duration-500 hover:scale-110 font-normal">
            We're rewriting the rules. By uniting industry expertise, innovative technology, and operational risk controls, we're introducing a new model of integration that streamlines operations and cuts costs. We provide the tools for physicians to thrive, maintain autonomy, and operate without the complexities of traditional management models.
          </p>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h2 className="text-[32px] md:text-[40px] leading-[1.3] font-bold mb-6 text-center">About Us</h2>
          <p className="text-[16px] md:text-[18px] leading-[1.6] text-gray-600 max-w-[960px] mx-auto text-center mb-12 md:mb-16">
            We operate at the intersection of expertise, technology, and trust—bringing deep industry
            knowledge and strategic insight to every engagement. Grounded in transparency and integrity,
            we align with those who prioritize operational excellence and long-term sustainability. Our
            approach is straightforward: no shortcuts—just a commitment to delivering meaningful results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {aboutUsCards.map((card, index) => (
              <ServiceCard
                key={index}
                title={card.title}
                detail={card.detail}
                image={card.image}
                link={card.link}
                onClick={card.link ? undefined : () => setSelectedServiceAbout(card.title)}
              />
            ))}
          </div>
        </div>
      </section>

{selectedServiceAbout && (
  <AboutModal
    isOpen={true}
    onClose={() => setSelectedServiceAbout(null)}
    title={selectedServiceAbout}
    description={
      aboutUsCards.find(card => card.title === selectedServiceAbout)?.description || ''
    }
  />
)}

      <section id="services" className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h2 className="text-[32px] md:text-[40px] leading-[1.3] font-bold mb-6 text-center">Our Services</h2>
          <p className="text-[16px] md:text-[18px] leading-[1.6] text-gray-600 max-w-[960px] mx-auto text-center mb-12 md:mb-16">
            We set the standard for accuracy, efficiency, and value - delivering faster turnarounds,
            unmatched precision, and measurable impact. Backed by rigorous risk controls and
            uncompromising quality, our integrated solutions go beyond excellence to redefine what's
            possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(serviceDetails).map(([key, service], index) => (
              <div key={index} className="service-card">
                <img 
                  src={[img1, img2, img3, img4, img5, img6][index]}
                  alt={service.title}
                  className="service-image"
                />
                <div className="service-content">
                  <h3 className="text-[20px] md:text-[24px] font-semibold mb-3">{service.title}</h3>
                  <div className='flex justify-between'>
                    <p className="text-gray-600 mb-4">
                      {service.detail}
                    </p>
                    <button 
                      className="service-learn-more"
                      onClick={() => setSelectedService(key)}
                    >
                      <CircleChevronRight/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <ServiceModal
          isOpen={true}
          onClose={() => setSelectedService(null)}
          service={serviceDetails[selectedService as keyof typeof serviceDetails]}
        />
      )}

<footer className="footer">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="footer-grid">
            <div>
              <img src={LogoDark} alt="DYAD" className="h-6 md:h-8 mb-4 md:mb-6" />
              <p className="text-gray-400 mb-6">
                Transforming healthcare operations through innovative solutions and unmatched expertise.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h3 className="footer-heading">Services</h3>
              <ul className="space-y-3">
                {Object.keys(serviceDetails).map((service) => (
                  <li key={service}>
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="footer-link text-left w-full"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="footer-heading">Company</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="footer-link text-left w-full"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')} 
                    className="footer-link text-left w-full"
                  >
                    Services
                  </button>
                </li>
                <li><Link to="/contact" className="footer-link">Contact</Link></li>
                <li><Link to="/onboarding" className="footer-link">Onboarding</Link></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h3 className="footer-heading">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-3" />
                  info@dyadps.com
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-3" />
                  (555) 123-4567
                </li>
                <li className="flex items-start text-gray-400">
                  <MapPin className="w-5 h-5 mr-3 mt-1" />
                  <span>123 Healthcare Ave,<br />Suite 100<br />City, State 12345</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; {new Date().getFullYear()} DYAD Practice Solutions. All rights reserved.</p>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;