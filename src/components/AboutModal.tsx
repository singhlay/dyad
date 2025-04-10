import { Link } from "react-router-dom";


// Fix 1: Update the AboutModal interface to match what you're actually using
interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    link? : string,
    description: string;  // Changed from 'details' to 'description'
  }
  
  const AboutModal: React.FC<AboutModalProps> = ({ isOpen, link,  onClose, title, description }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay backdrop-blur-[1px] " onClick={onClose}>
        <div className="modal-content border-[2px] border-primary" onClick={e => e.stopPropagation()}>
          <div className="modal-body p-4 text-center">
            <h3 className="modal-title mb-2 font-semibold text-xl">{title}</h3>
            <p className="modal-description text-gray-600 clamped-text text-lg" lang="en">{description}</p>
            {link && <p className="modal-description text-gray-600 clamped-text text-lg my-2">To learn more <Link to={link} onClick={onClose} className="my-2 text-blue-600 hover:text-blue-800 transition-colors font-medium">Register Today</Link>.</p>}
          </div> 
        </div>
      </div>
    );
  };

  export default AboutModal;