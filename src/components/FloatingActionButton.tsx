import React, { useState } from 'react';
import { Download, Printer, Share2, FileText } from 'lucide-react';

interface FloatingActionButtonProps {
  onExport: () => void;
  onPrint: () => void;
  onExportPDF: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onExport, onPrint, onExportPDF }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonActions = [
    { onClick: onExportPDF, icon: FileText, label: 'Export PDF' },
    { onClick: onExport, icon: Download, label: 'Export CSV' },
    { onClick: onPrint, icon: Printer, label: 'Print' }
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <div className={`flex flex-col items-end space-y-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {buttonActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex items-center space-x-2 sm:space-x-3 bg-slate-100 rounded-full py-2 px-3 sm:py-3 sm:px-4 shadow-[3px_3px_10px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 hover:bg-slate-200"
          >
            <action.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            <span className="text-xs sm:text-sm font-medium text-slate-600 pr-1 sm:pr-2 hidden sm:inline">{action.label}</span>
          </button>
        ))}
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`mt-3 w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 text-white rounded-full shadow-[3px_3px_10px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_8px_rgba(0,0,0,0.3)] active:shadow-[1px_1px_4px_rgba(0,0,0,0.4)] transition-all duration-300 flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isOpen ? 'rotate-45' : ''}`}
      >
        <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default FloatingActionButton;