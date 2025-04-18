import { X } from 'lucide-react';
import React, {useEffect} from 'react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    items: string[]
    detail : string
  };
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {


  if (!isOpen) return null;

  // Calculate if the last item should span full width
  const shouldLastItemSpanFull = service?.items.length % 2 !== 0;

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[1px] flex items-center justify-center z-50 p-4 " onClick={onClose}>
      <div className="overflow-y-auto relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[95vh] mx-auto p-8 border-[2px] border-primary modal-content-service" >
       <div  ><X onClick={onClose} className='absolute top-4 right-4'/></div>
        <div className="flex justify-between items-center mb-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 text-center w-full">
  {service?.title}
</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service?.items.map((item, index) => (
            <div 
              key={index} 
              className={`
                bg-[#DAE8F533] rounded-lg border border-[#C2CFDC] shadow-md p-6 flex justify-center items-center
                ${index === service?.items.length - 1 && shouldLastItemSpanFull ? 'col-span-1 sm:col-span-2 ' : ''}
              `}
            >
              <p className="text-gray-800 text-lg font-medium text-center">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;