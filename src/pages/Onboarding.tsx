import { useState } from 'react';

interface OnboardingStep {
  number: string;
  title: string;
  description: string;
  color: string;
}

interface OnboardingStep {
  number: string;
  title: string;
  description: string;
  color: string;
  details: {
    purpose: string;
    when: string;
    content: string[];
  };
}

const onboardingSteps: OnboardingStep[] = [
  {
    number: "1",
    title: "Schedule an Introduction Call",
    description: "Initial consultation to understand your practice and explain our approach",
    color: "#4CAF50",
    details: {
      purpose: "To introduce Dyad and learn about your practice needs",
      when: "At your convenience",
      "content": [
      "During this call, we will:",
      "• Introduce Dyad: Who we are, who we support, and what makes our approach different",
      "• Learn about the practice: Specialty(ies), team structure, key challenges, and priorities",
      "• Walk through our discovery and due diligence process to set clear expectations",
      "• Answer any questions and outline next steps",
      "Once the introductory call is complete and there's interest in proceeding, we'll begin a structured intake and onboarding process at a pace that supports the needs of the practice. This includes a coordinated sequence of documents and reviews to ensure alignment and transparency from the beginning"
    ]
    }
  },
{
  number: "2",
    title: "Mutual Confidentiality & Business Associate Agreements",
      description: "Setting up legal framework for secure collaboration",
        color: "#00BCD4",
          details: {
    purpose: "These two agreements will be sent together as the first step before any exchange of data or documentation to protect sensitive information and ensure HIPAA compliance",
      when: "After introduction call, access link sent within 1 day of confirmation to proceed, valid for 10 days",
        content: [
          "• The Mutual Confidentiality Agreement ensures that any business, operational, or financial information shared during the evaluation process remains confidential and protected",
          "• The Business Associate Agreement (BAA) is required under HIPAA regulations to safeguard protected health information (PHI) during our review",
          "This agreement outlines Dyad's responsibilities in handling PHI securely and in compliance with applicable laws",
          "Together, these agreements create the foundation for open and protected collaboration throughout the intake process and a prospective engagement.",
        ]
  }
},
{
  number: "3",
    title: "Discovery & Due Diligence",
      description: "Comprehensive analysis of your practice operations",
        color: "#8BC34A",
          details: {
    purpose: "To gain a comprehensive, informed view of the practice's revenue cycle operations",
      when: "Begins within 1 day of digitally signing both the Mutual Confidentiality and Business Associate Agreements in accordance with a pace that supports the Practice. Prospective client to complete questionnaire within 10 days. Dyad’s comprehensive due diligence process may take up to 21 business days to complete.",
        content: [
          "Once the agreements are in place, Dyad will initiate the discovery and due diligence process. This includes a structured questionnaire and a request for six months of key revenue cycle and billing data:",
          "• Accounts Receivable (AR) Aging",
          "• Claim Denials",
          "• Payor Mix",
          "• Monthly Charges and Collections",
          "• Available KPI or performance reports",
          "Our EHR systems experts are available to help navigate where and how to access this information. This step is not only about data collection, it allows us to evaluate operational workflows, identify friction points or inefficiencies, and surface opportunities to enhance revenue performance, compliance, and sustainability.",
        ]
  }
},
{
  number: "4",
    title: "Service Proposal & Non-Binding Letter of Intent",
      description: "Detailed engagement structure and mutual alignment",
        color: "#03A9F4",
          details: {
    purpose: "To outline the structure of the proposed engagement and confirm mutual alignment before entering into a formal agreement",
      when: "Presented within 7 days after discovery & due diligence completion, Proposal valid for 21 days",
        content: [
          "Following our review of the discovery and due diligence materials, Dyad will present two companion documents:",
          "1. Service Proposal includes:",
          "• Recommended scope of services",
          "• Dyad's responsibilities and deliverables",
          "• Client obligations (access, communication, timelines)",
          "• Key performance indicators and reporting expectations",
          "• High-level implementation timeline",
          "2. Non-Binding Letter of Intent (LOI):",
          "• Reflects mutual interest in proceeding",
          "• Summarizes key commercial and operational terms",
          "• Bridge between discovery and formal onboarding",
          "Together, these documents provide a clear, shared understanding of the proposed engagement and allow both parties to confirm alignment before executing the Master Services Agreement (MSA)."
        ]
  }
},
{
  number: "5",
    title: "Master Services Agreement (MSA)",
      description: "Formal establishment of partnership terms",
        color: "#2196F3",
          details: {
    purpose: "To formally establish the terms, responsibilities, and scope of the engagement",
      when: "Sent within 1 day of acceptance of Services Proposal and receipt of digitally signed non-binding LOI. MSA valid for 14 days",
        content: [
          "After the LOI is signed, you’ll be presented with a Master Services Agreement (MSA) that governs the scope of services. Upon execution of the MSA, we will begin the formal onboarding of the practice into Dyad’s systems and workflows with full support.",
        ]
  }
}
];

const Onboarding = () => {
  const [selectedStep, setSelectedStep] = useState<OnboardingStep | null>(null);

  return (
    <div className="min-h-screen bg-white pt-32" >

      {/* Client Intake & Onboarding Section */}
      <section className="py-16 md:py-24">
        <div className=" mx-auto px-4 md:px-8 ">
          <div className='max-w-[1100px] mx-auto'>
            <h2 className="text-[32px] md:text-[40px] leading-[1.3] font-bold mb-6 text-center clamped-text">
              Client Intake & Onboarding: A Streamlined Approach
            </h2>
            <div className="text-center mb-12 md:mb-16 ">
              <p className="text-[16px] md:text-[18px] leading-[1.6] text-gray-600 mb-4 clamped-text">
                At Dyad, efficiency starts from day one. Our client intake and onboarding process is designed to be
                seamless, transparent, and tailored to the operational realities of a practice. We prioritize clear
                communication, structured transitions, and minimal disruption.
              </p>
              <p className="text-[16px] md:text-[18px] leading-[1.6] text-gray-600 clamped-text">
                Our onboarding is more than just a checklist—it's a structured, strategic process designed to set the
                foundation for long-term success. <a href="#register" className="text-primary hover:underline">Register Today</a>
              </p>
            </div>
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
                  {
                    <div className={`step-number  min-h-full  ${selectedStep ? ' invisible' : "visible"} `} >{step.number}</div>}
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
      {selectedStep && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[1px] flex items-center justify-center p-4 z-50 "
          onClick={() => setSelectedStep(null)} // Close when clicking outside
        >
          <div className="relative w-full max-w-3xl flex flex-col items-center">
{/* Number circle positioned at top center of container */}
<div
              className="text-5xl absolute rounded-full w-20 h-20 flex items-center justify-center text-white -top-4 left-1/2 -translate-x-1/2 z-10"
              style={{ backgroundColor: selectedStep.color }}
            >
              {selectedStep.number}
            </div>

            <div
            className="bg-white rounded-lg max-w-3xl w-full p-6 relative mt-8 max-h-[80vh] overflow-y-auto"
            style={{ border: `2px solid ${selectedStep.color}` }}
            onClick={(e) => e.stopPropagation()}
          >

            <div className="text-center mb-6 mt-5 ">
          <h3 className="text-2xl font-bold text-gray-800 ">{selectedStep.title}</h3>
          </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Purpose</h4>
                <p className="text-gray-600">{selectedStep.details.purpose}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Timeline</h4>
                <p className="text-gray-600">{selectedStep.details.when}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">What We Do</h4>
                <ul className="space-y-2">
                  {selectedStep.details.content.map((item, index) => (
                    <li
                      key={index}
                      className={`text-gray-600 ${item.startsWith('•') ? 'pl-4' : ''}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>


          </div>


       

        </div>
      )}

    </div>
  );
};

export default Onboarding;