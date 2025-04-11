import React, { useEffect, useState } from 'react';
import { ChevronRightCircle , Mail, Phone, MapPin } from 'lucide-react';
import {  useLocation } from 'react-router-dom';
import {  innovativetech,  special , prac, pre, realtime, claims } from '../assets/images/index.ts';
import ServiceModal from '../components/ServiceModal.js';
import { dyadVideo } from '../assets/videos/index.ts';

interface AboutUsItem {
  title: string;
  detail: string;
  description: string;
  image: string; // Assuming img1, img2 etc. are string paths
  link?: string; // Optional because not all items have it
}


interface HomeProps {
  whatWeDoItems: Record<string, string[]>;
  aboutUsItems : AboutUsItem[];
  selectedServiceAbout: string | null;
  setSelectedServiceAbout: (section: string | null) => void;
}

interface ServiceCardProps {
  title: string;
  detail: string;
  image: string;
  link?: string;
  onClick?: () => void;
}

interface ServiceDetail {
  title: string;
  detail: string;
  items: string[];
  img: string;
}


const ServiceCard: React.FC<ServiceCardProps> = ({ title, detail, link, image, onClick }) => {
  // Content to be rendered inside or outside of Link
  const cardContent = (
    <>
    <div >
      <img 
        src={image}
        alt={title}
        className="service-image"
      />
      </div>
      <div className="service-content">
        <h3 className="text-[20px] font-semibold mb-3">{title}</h3>
        <div className='flex justify-between items-center'>
          <p className="text-gray-600 ">
            {detail}
          </p>
          <div className="service-learn-more">
            <ChevronRightCircle className='w-6 h-6'/>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="service-card">
        <button 
          className="w-full text-left"
          onClick={onClick}
        >
          {cardContent}
        </button>
    </div>
  );
};



const serviceDetails : Record<string, ServiceDetail>= {
  'Practice Foundations': {
    title: 'Practice Foundations',
    items: [
      'Payer Contracting',
      'Practice Assessment',
      'Payer Enrollment',
      'Facility Credentialing',
      'Physician Credentialing',
      'Physician Licensing'
    ],
    detail: "Startup support, compliance, and credentialing",
    img: prac
  },
  'Practice Management': {
    title: 'Practice Management',
    detail: "Accounting & Tax, Digital Marketing & Branding, Human Resources, Technology Solutions",
    items: [
      'Accounting & Tax',
      'Digital Marketing & Branding',
      'Human Resources',
      'Technology Solutions',
    ],
    img:  innovativetech
  },
  'Pre & Post Encounter': {
    title: 'Pre & Post Encounter',
    detail: "Eligibility verifications, prior-authorizations, patient estimates, Precision driven charge capture, Specialty Coding",
    items: [
      'Eligibility & Benefits Verifications',
      'Expedited Charge Capture',
      'Prior Authorizations',
      'Specialty Coding',
      'Patient Good Faith Estimates',
      'Claims Scrubbing & Submission'
    ]
    ,
    img: pre
  },
  'Claims Management': {
    title: 'Claims Management',
    detail: "Expedited submissions, resolutions & real-time tracking",
    items: [
      'Denials & Appeals',
      'Accounts Receivable (AR)',
      'Payment Posting & Reconciliation',
      'Rebill Processing',
      'Underpayments Detection & Recovery'
    ]
    ,
    img: claims
  },
  'Specialty Billing': {
    title: 'Specialty Billing',
    detail: "Expert lien management for complex cases",
    items: [
      'Personal Injury',
      'Workers Compensation'
    ]
    ,
    img: special
  },
  'Real Time Insights': {
    title: 'Real Time Insights',
    detail: "Credentialing alerts, reporting & strategic insights",
    items: [
      'Track Claims Real Time',
      'CAQH Management',
      'Contracted Rates Benchmarking',
      'Market Analytics',
      'Robust Reporting',
      'Customized Insights'
    ]
    ,
    img: realtime
  }
};


const Home: React.FC<HomeProps> = ({ aboutUsItems, setSelectedServiceAbout}) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

 
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
     <section className="relative min-h-[320px] md:min-h-[400px] lg:min-h-[700px] flex justify-center items-end text-white pt-24 md:pt-32 overflow-hidden">
  {/* Video background */}
  <div className="absolute inset-0 z-0 ">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      preload="auto"
    >
      <source src={dyadVideo} type="video/mp4" />
      {/* Fallback image if video doesn't load */}
      <img 
        src="/assets/images/hero-fallback.jpg" 
        alt="Background fallback"
        className="w-full h-full object-cover"
      />
    </video>
    {/* Optional overlay for better text readability */}
    <div className="absolute bg-black bg-opacity-10 inset-0"></div>
  </div>

  {/* Content */}
  <div className="max-w-[1300px] mx-auto px-4 md:px-8 relative z-10">
    <h1 className=" text-[26px] md:text-[48px] lg:text-[60px] leading-[1.2] mb-4 md:mb-6 text-center transition-all duration-500 hover:scale-110 font-semibold">
      A Bold Partnership Model<br />
      For Smarter Healthcare Operations
    </h1>
    <p className="text-[14px] md:text-[18px] lg:text-[24px] mb-8 clamped-text transition-all duration-500 hover:scale-110 font-normal " 
    >
      We're rewriting the rules. By uniting industry expertise, innovative technology, and operational risk controls, we're introducing a new model of integration that streamlines operations and cuts costs. We provide the tools for physicians to thrive, maintain autonomy, and operate without the complexities of traditional management models.
    </p>
  </div>
</section>

      <section id="about" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h2 className="text-[32px] md:text-[40px] leading-[1.3] font-bold mb-6 text-center">About Us</h2>
          <p className="clamped-text text-[16px] md:text-[22px] leading-[1.6] text-gray-600  mx-auto  mb-12 md:mb-16" style={{padding : "0px"}}>
          We operate at the intersection of expertise, technology, and trust, bringing deep industry knowledge and strategic insight to every engagement. Grounded in transparency and integrity, we align with those who prioritize operational excellence and long-term sustainability. Our approach is straightforward: no shortcuts, just a commitment to delivering meaningful results.
          </p>
          <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {aboutUsItems?.map((card, index) => (
              <ServiceCard
                key={index}
                title={card.title}
                detail={card.detail}
                image={card.image}
                link={card.link}
                onClick={() => setSelectedServiceAbout(card.title)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h2 className="text-[32px] md:text-[40px] leading-[1.3] font-bold mb-6 text-center">Our Services</h2>
          <p className="text-[16px] md:text-[22px] leading-[1.6] text-gray-600 mx-auto  mb-12 md:mb-16 clamped-text" style={{padding : "0px"}}>
          We set the standard for accuracy, efficiency, and value - delivering  faster turnarounds, unmatched precision, and measurable impact. Backed  by rigorous risk controls and uncompromising quality, our integrated  solutions go beyond excellence to redefine what’s possible. No  fragmentation - just a unified approach. Most services operate within  our full-service model, where seamless integration drives real value.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(serviceDetails).map(([key, service], index) => (
              <div key={index} className="service-card" onClick={() => setSelectedService(key)}>
                <img 
                  src={service.img}
                  alt={service.title}
                  className="service-image"
                />
                 <div className="service-content">
                  <h3 className="text-[20px] font-semibold  mb-3">{service.title}</h3>
                  <div className='flex justify-between'>
                    <p className="text-gray-600 ">
                      {service.detail}
                    </p>
                    <button 
                      className="service-learn-more"
                    >
                      <ChevronRightCircle className='w-6 h-6'/>
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
              <h3 className="footer-heading">Company</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                  onClick={() => {
                    setSelectedServiceAbout('Our Story & Inspiration')
                    scrollToSection('about')
                  }} 
                    className="footer-link text-left w-full"
                  >
                    Our Story & Inspiration
                  </button>
                </li>
                <li>
                  <button 
                  onClick={() => {
                    setSelectedServiceAbout('Clarity & Accountability')
                    scrollToSection('about')
                  }} 
                    className="footer-link text-left w-full"
                  >
                    Clarity & Accountability
                  </button>
                </li>
                <li>
                  <button 
                  onClick={() => {
                    setSelectedServiceAbout('Innovative Technology')
                    scrollToSection('about')
                  }} 
                    className="footer-link text-left w-full"
                  >
                    Innovative Technology
                  </button>
                </li>
               
                <li>
                  <button 
                  onClick={() => {
                    setSelectedServiceAbout('Empowering Physician Autonomy')
                    scrollToSection('about')
                  }} 
                    className="footer-link text-left w-full"
                  >
                    Empowering Physician Autonomy
                  </button>
                </li>
                <li>
                  <button 
                  onClick={() => {
                    setSelectedServiceAbout('Why Dyad')
                    scrollToSection('about')
                  }} 
                    className="footer-link text-left w-full"
                  >
                    Why Dyad?
                  </button>
                </li>
                <li>
                <button 
                  onClick={() => {
                    setSelectedServiceAbout('Our Process')
                    scrollToSection('about')
                  }} 
                    className="footer-link text-left w-full"
                  >
                    Our Process
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="footer-heading">Services</h3>
              <ul className="space-y-3">
                {Object.keys(serviceDetails).map((service) => (
                  <li key={service}>
                    <button 
                      onClick={() => {
                        scrollToSection('services')
                        setSelectedService(service)}}
                      className="footer-link text-left w-full"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>


            <div>
              <h3 className="footer-heading">Specialties</h3>
              <ul className="space-y-3">
              <li className="footer-link"> Surgical & Procedural Specialties</li>
              <li className="footer-link"> Interventional & Diagnostic Care</li>
              <li className="footer-link"> Perioperative & Supportive Services</li>
              <li className="footer-link"> Outpatient & Specialty Facilities</li>
              </ul>
            </div>

            <div>
              <h3 className="footer-heading">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-3" />
                  info@dyadmd.com 
                </li>
                <li className="flex items-start text-gray-400">
                  <MapPin className="w-6 h-6 mr-3 " />
                  <p>2573 Pacific Coast Hwy, Ste A277 <br />Torrance, CA 90505</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; {new Date().getFullYear()} DYAD Practice Solutions. All rights reserved.</p>
              <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                <li className="hover:text-white transition-colors duration-200">Privacy Policy</li>
                <li className="hover:text-white transition-colors duration-200">Terms of Service</li>
                <li className="hover:text-white transition-colors duration-200">Cookie Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;