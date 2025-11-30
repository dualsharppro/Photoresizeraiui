import { useState, useEffect } from 'react';

interface UploadingModalProps {
  onCancel?: () => void;
  onComplete?: () => void;
}

export function UploadingModal({ onCancel, onComplete }: UploadingModalProps) {
  const [progress, setProgress] = useState(0);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (isCancelled) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Call onComplete when upload is done
          setTimeout(() => {
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isCancelled, onComplete]);

  const handleCancel = () => {
    setIsCancelled(true);
    onCancel?.();
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 backdrop-blur-md animate-fadeIn">
      <div className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-xl rounded-3xl p-8 max-w-sm w-full mx-6 shadow-2xl border border-white/30 dark:border-neutral-700/30">
        {/* Progress Section */}
        <div className="mb-6">
          <p className="text-neutral-900 dark:text-white mb-4 text-center">
            Uploading...
          </p>
          
          {/* Progress Bar */}
          <div className="relative h-2 bg-neutral-200/50 dark:bg-neutral-700/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="absolute inset-y-0 left-0 bg-blue-500 dark:bg-blue-600 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <p className="text-center text-neutral-500 dark:text-neutral-400 mb-8">
          {progress}%
        </p>

        <button 
          onClick={handleCancel}
          disabled={isCancelled}
          className="w-full px-6 py-3.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed animate-fadeIn"
        >
          {isCancelled ? 'Cancelled' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}