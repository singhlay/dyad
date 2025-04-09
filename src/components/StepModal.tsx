import { Calendar } from "lucide-react";

interface OnboardingStep {
    number: string;
    title: string;
    description: string;
    color: string;
    details: {
      purpose: string;
      when: string;
      content: string[];
      calendlyLink?: string;
    };
  }


// Fix 1: Update the AboutModal interface to match what you're actually using
interface StepModalProps {
    selectedStep: OnboardingStep;
    setSelectedStep: (step: OnboardingStep | null) => void;
}
  
  const StepModal:  React.FC<StepModalProps>  = ({ selectedStep , setSelectedStep }) => {

    const handleCalendlyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.open(selectedStep.details.calendlyLink, '_blank', 'width=1000,height=800');
      };

    return (
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
                  {selectedStep.details.content.map((item : any, index : any) => (
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
        
            {selectedStep.details.calendlyLink && (
              <div className="mt-6 text-center">
                <a
                  href={selectedStep.details.calendlyLink}
                  onClick={handleCalendlyClick}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Call
                </a>
              </div>
            )}
        
          </div>
        
        
        </div>
        
        
        </div>
    );
  };

  export default StepModal;

