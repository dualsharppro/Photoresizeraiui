import { CheckCircle2 } from 'lucide-react';

interface SuccessModalProps {
  onClose?: () => void;
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 backdrop-blur-md animate-fadeIn">
      <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-2xl rounded-3xl p-8 max-w-sm w-full mx-6 shadow-2xl border border-white/20 dark:border-neutral-700/50 animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 dark:bg-green-600/20 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 dark:text-green-400" strokeWidth={2} />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-center text-neutral-900 dark:text-neutral-100 mb-8">
          Successfully Completed
        </h2>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="w-full px-6 py-3.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 active:scale-95"
        >
          Done
        </button>
      </div>
    </div>
  );
}
