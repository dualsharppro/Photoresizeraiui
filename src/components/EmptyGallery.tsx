import { Plus } from 'lucide-react';
import emptyStateImage from 'figma:asset/8eed0b3dff34e21f62946a71bd3bd07e699319ee.png';

interface EmptyGalleryProps {
  onUploadClick: () => void;
}

export function EmptyGallery({ onUploadClick }: EmptyGalleryProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-950 transition-colors relative animate-fadeIn">
      <div className="text-center max-w-md w-full">
        {/* Illustration */}
        <div className="mb-8 flex justify-center">
          <img 
            src="src/assets/8eed0b3dff34e21f62946a71bd3bd07e699319ee.png" 
            alt="No photos" 
            className="w-48 h-48 object-contain dark:opacity-90"
          />
        </div>
        
        {/* Text */}
        <p className="text-neutral-400 dark:text-neutral-600">
          No photo uploaded yet
        </p>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onUploadClick}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        aria-label="Upload photo"
      >
        <Plus className="w-6 h-6 text-white dark:text-neutral-900" strokeWidth={2.5} />
      </button>
    </div>
  );
}