import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { UploadingModal } from './UploadingModal';
import { ProcessingOptions } from './ProcessingOptions';
import { Search, Mic, Check, CheckCircle2, Circle } from 'lucide-react';

interface PhotoPickerProps {
  showUploadModal?: boolean;
  showOptionsModal?: boolean;
  onCancel?: () => void;
  onOptionsOpen?: () => void;
  onOptionsClose?: () => void;
  onUploadStart?: () => void;
  onUploadComplete?: () => void;
}

const mockPhotos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop' },
  { id: 2, src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop' },
  { id: 3, src: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&h=400&fit=crop' },
  { id: 4, src: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=400&fit=crop' },
  { id: 5, src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop' },
  { id: 6, src: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=400&h=400&fit=crop' },
  { id: 7, src: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&h=400&fit=crop' },
  { id: 8, src: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=400&h=400&fit=crop' },
  { id: 9, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop' },
  { id: 10, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop' },
  { id: 11, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop' },
  { id: 12, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop' },
];

export function PhotoPicker({ 
  showUploadModal = false, 
  showOptionsModal = false,
  onCancel,
  onOptionsOpen,
  onOptionsClose,
  onUploadStart,
  onUploadComplete
}: PhotoPickerProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([4]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(showUploadModal);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(showOptionsModal);

  const togglePhoto = (id: number) => {
    if (selectedPhotos.includes(id)) {
      setSelectedPhotos(selectedPhotos.filter((photoId) => photoId !== id));
    } else {
      setSelectedPhotos([...selectedPhotos, id]);
    }
  };

  const selectAll = () => {
    if (selectedPhotos.length === mockPhotos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(mockPhotos.map(photo => photo.id));
    }
  };

  const handleCancelUpload = () => {
    setIsUploadModalOpen(false);
  };

  const handleUploadComplete = () => {
    setIsUploadModalOpen(false);
    onUploadComplete?.();
  };

  const handleUploadClick = () => {
    setIsOptionsModalOpen(true);
    onOptionsOpen?.();
  };

  const handleOptionsCancel = () => {
    setIsOptionsModalOpen(false);
    onOptionsClose?.();
  };

  const handleOptionsProceed = () => {
    setIsOptionsModalOpen(false);
    onUploadStart?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-2xl rounded-3xl overflow-hidden max-w-md w-full shadow-2xl border border-white/20 dark:border-neutral-700/50">
        {/* Header */}
        <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-700/50 px-6 py-4 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onCancel}
              className="text-blue-500 hover:text-blue-600 transition-colors relative z-10"
            >
              Cancel
            </button>
            {selectedPhotos.length > 0 && (
              <button 
                onClick={selectAll}
                className="text-blue-500 hover:text-blue-600 transition-colors relative z-10 flex flex-col items-center gap-0.5"
                aria-label={selectedPhotos.length === mockPhotos.length ? 'Deselect All' : 'Select All'}
              >
                {selectedPhotos.length === mockPhotos.length ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
                <span className="text-xs">All</span>
              </button>
            )}
            <button 
              onClick={handleUploadClick}
              disabled={selectedPhotos.length === 0}
              className={`transition-colors relative z-10 ${
                selectedPhotos.length === 0 
                  ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed' 
                  : 'text-blue-500 hover:text-blue-600'
              }`}
            >
              Upload
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Photos, People, Places..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-700/50 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-0.5 bg-neutral-200/50 dark:bg-neutral-900/50 max-h-[500px] overflow-y-auto">
          {mockPhotos.map((photo) => {
            const isSelected = selectedPhotos.includes(photo.id);
            return (
              <button
                key={photo.id}
                onClick={() => togglePhoto(photo.id)}
                className="aspect-square relative group overflow-hidden bg-neutral-100 dark:bg-neutral-900"
              >
                <ImageWithFallback
                  src={photo.src}
                  alt={`Photo ${photo.id}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 transition-all ${
                    isSelected
                      ? 'bg-blue-500/20 ring-2 ring-inset ring-blue-500'
                      : 'bg-black/0 group-hover:bg-black/10'
                  }`}
                />
                {isSelected && (
                  <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border-t border-neutral-200/50 dark:border-neutral-700/50 px-6 py-4">
          <button className="w-full text-blue-500 hover:text-blue-600 transition-colors">
            Show Selected ({selectedPhotos.length})
          </button>
        </div>
      </div>

      {isOptionsModalOpen && (
        <ProcessingOptions 
          onProceed={handleOptionsProceed}
          onCancel={handleOptionsCancel}
          selectedCount={selectedPhotos.length}
        />
      )}

      {showUploadModal && isUploadModalOpen && (
        <UploadingModal 
          onCancel={handleCancelUpload}
          onComplete={handleUploadComplete}
        />
      )}
    </div>
  );
}