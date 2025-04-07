import  { useState } from 'react';

interface OnboardingStep {
  number: string;
  title: string;
  description: string;
  color: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    number: "1",
    title: "Discovery & Alignment",
    description: "We begin with an in-depth review of current operations, contracts, and revenue cycle workflows. This ensures alignment between existing structures and Dyad's solutions.",
    color: "#4CAF50"
  },
  {
    number: "2",
    title: "Data & System Integration",
    description: "Our team coordinates secure data transfers, credentialing verification, and system access setup. We integrate with existing platforms and develop optimized solutions that align with practice needs.",
    color: "#00BCD4"
  },
  {
    number: "3",
    title: "Risk & Compliance Assessment",
    description: "A comprehensive review of financial, operational, and regulatory risk factors is conducted. Our enterprise risk management framework ensures all processes are built with compliance and continuity in mind.",
    color: "#8BC34A"
  },
  {
    number: "4",
    title: "Training & Transition Support",
    description: "Comprehensive training and transition support, ensuring a smooth transition from specialty coding nuances to revenue optimization strategies, our team remains actively engaged.",
    color: "#03A9F4"
  },
  {
    number: "5",
    title: "Go-Live & Continuous Optimization",
    description: "With implementation complete, operations run smoothly, backed by Dyad's continuous monitoring and data-driven insights. We remain a proactive partner, refining processes and addressing challenges as they arise.",
    color: "#2196F3"
  }
];

const Onboarding = () => {
  const [selectedStep, setSelectedStep] = useState<OnboardingStep | null>(null);

  return (
    <div className="min-h-screen bg-white pt-32" >

      {/* Client Intake & Onboarding Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h2 className="text-[32px] md:text-[40px] leading-[1.3] font-bold mb-6 text-center">
            Client Intake & Onboarding: A Streamlined Approach
          </h2>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-gray-600 mb-4">
              At Dyad, efficiency starts from day one. Our client intake and onboarding process is designed to be
              seamless, transparent, and tailored to the operational realities of a practice. We prioritize clear
              communication, structured transitions, and minimal disruption.
            </p>
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-gray-600">
              Our onboarding is more than just a checklist—it's a structured, strategic process designed to set the
              foundation for long-term success. <a href="#register" className="text-primary hover:underline">Register Today</a>
            </p>
          </div>

          {/* Timeline */}
          <div className="timeline-container">
            <div className="timeline-steps">
              {onboardingSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`timeline-step step-${step.number} ${selectedStep?.number === step.number ? 'active' : ''}`}
                  onClick={() => setSelectedStep(step)}
                >
                 {<div className="step-number md:min-h-20">{!selectedStep && step.number}</div>} 
                  <div className="step-circle">
                  </div>
                  <div className="step-title">
                    <div className={`step-box ${selectedStep?.number === step.number ? 'active' : ''}`}>
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
     {/* Modal */}
 {selectedStep && (
  <div 
    className="fixed inset-0  flex items-center justify-center p-4 z-50"
    onClick={() => setSelectedStep(null)} // Close when clicking outside
  >
    <div 
      className="bg-white rounded-lg max-w-2xl w-full p-6 relative mt-8  "
      style={{ border: `2px solid ${selectedStep.color}` }}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      {/* Number circle positioned at top center of container */}
      <div 
        className="absolute rounded-full w-14 h-14 flex items-center justify-center text-white -top-6 left-1/2 -translate-x-1/2"
        style={{ backgroundColor: selectedStep.color }}
      >
        {selectedStep.number}
      </div>

      {/* Content */}
      <div className="mt-4 text-center">
        <h3 className="text-xl font-bold text-gray-800 text-center">{selectedStep.title}</h3>
        <p className="text-gray-600 mt-4 clamped-text">{selectedStep.description}</p>
      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default Onboarding;