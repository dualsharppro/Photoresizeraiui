import { Plus, Share2, Download, CheckCircle2, Circle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface GalleryProps {
  onAddClick: () => void;
  hideAddButton?: boolean;
}

const galleryPhotos = [
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
  { id: 13, src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop' },
  { id: 14, src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop' },
  { id: 15, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop' },
  { id: 16, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop' },
  { id: 17, src: 'https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=400&h=400&fit=crop' },
  { id: 18, src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop' },
];

export function Gallery({ onAddClick, hideAddButton = false }: GalleryProps) {
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [hoveredPhotoId, setHoveredPhotoId] = useState<number | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  const togglePhotoSelection = (id: number) => {
    setSelectedPhotos(prev => 
      prev.includes(id) 
        ? prev.filter(photoId => photoId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedPhotos.length === galleryPhotos.length) {
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(galleryPhotos.map(photo => photo.id));
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors animate-fadeIn">
      {/* Header */}
      <div className="p-6 pb-4">
        {selectedPhotos.length > 0 ? (
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSelectedPhotos([])}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              Cancel
            </button>
            <div className="flex items-center gap-4">
              <button 
                onClick={selectAll}
                className="text-blue-500 hover:text-blue-600 transition-colors flex flex-col items-center gap-0.5"
                aria-label={selectedPhotos.length === galleryPhotos.length ? 'Deselect All' : 'Select All'}
              >
                {selectedPhotos.length === galleryPhotos.length ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
                <span className="text-xs">All</span>
              </button>
              <h1 className="text-base text-neutral-900 dark:text-neutral-100">
                {selectedPhotos.length} Selected
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => alert('Share functionality')}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 text-blue-500" />
              </button>
              <button 
                onClick={() => alert('Download functionality')}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95 transition-all"
                aria-label="Download"
              >
                <Download className="w-5 h-5 text-blue-500" />
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-neutral-900 dark:text-neutral-100">Recents</h1>
        )}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-0.5 bg-neutral-200/50 dark:bg-neutral-900/50">
        {galleryPhotos.map((photo) => {
          const isSelected = selectedPhotos.includes(photo.id);
          const isHovered = hoveredPhotoId === photo.id;
          
          return (
            <button
              key={photo.id}
              onClick={() => togglePhotoSelection(photo.id)}
              onMouseEnter={() => setHoveredPhotoId(photo.id)}
              onMouseLeave={() => setHoveredPhotoId(null)}
              className="aspect-square relative overflow-hidden bg-neutral-100 dark:bg-neutral-900"
            >
              <ImageWithFallback
                src={photo.src}
                alt={`Photo ${photo.id}`}
                className="w-full h-full object-cover"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-blue-500/20 ring-2 ring-inset ring-blue-500" />
              )}
              {isHovered && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-2 px-3 animate-fadeIn">
                  <p className="text-white text-sm text-center">Sample Text</p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Floating Action Button */}
      {!hideAddButton && (
        <button 
          onClick={onAddClick}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all z-30"
          aria-label="Add photos"
        >
          <Plus className="w-6 h-6 text-white dark:text-neutral-900" strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}