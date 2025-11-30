import { useState } from 'react';
import { EmptyGallery } from './components/EmptyGallery';
import { Gallery } from './components/Gallery';
import { PhotoPicker } from './components/PhotoPicker';
import { SuccessModal } from './components/SuccessModal';
import { LoginScreen } from './components/LoginScreen';
import { Moon, Sun } from 'lucide-react';

type Screen = 'login' | 'empty' | 'gallery' | 'picker' | 'options' | 'uploading' | 'success';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isDark, setIsDark] = useState(false);
  const [showPickerOverlay, setShowPickerOverlay] = useState(false);
  const [showOptionsOverlay, setShowOptionsOverlay] = useState(false);
  const [showUploadingOverlay, setShowUploadingOverlay] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);

  const handleReturnToGallery = () => {
    setGalleryKey(prev => prev + 1);
    setCurrentScreen('gallery');
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('empty');
  };

  const handleCloseOverlay = () => {
    setGalleryKey(prev => prev + 1);
    setShowPickerOverlay(false);
    setShowOptionsOverlay(false);
    setShowUploadingOverlay(false);
    setShowSuccessOverlay(false);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors">
        {/* Theme Toggle */}
        <div className="fixed top-6 right-6 flex items-center gap-3 z-50">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            )}
          </button>
        </div>

        {/* Screens */}
        {currentScreen === 'login' && (
          <LoginScreen 
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {currentScreen === 'empty' && <EmptyGallery onUploadClick={() => setCurrentScreen('picker')} />}
        {currentScreen === 'gallery' && (
          <>
            <Gallery key={galleryKey} onAddClick={() => setShowPickerOverlay(true)} hideAddButton={showPickerOverlay || showOptionsOverlay || showUploadingOverlay} />
            {showPickerOverlay && (
              <div className="fixed inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-md z-40 animate-fadeIn">
                <PhotoPicker 
                  onCancel={handleCloseOverlay}
                  onOptionsOpen={() => {
                    setShowPickerOverlay(false);
                    setShowOptionsOverlay(true);
                  }}
                />
              </div>
            )}
            {showOptionsOverlay && (
              <div className="fixed inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-md z-40 animate-fadeIn">
                <PhotoPicker 
                  showOptionsModal 
                  onCancel={handleCloseOverlay}
                  onOptionsOpen={() => setShowOptionsOverlay(true)}
                  onOptionsClose={() => {
                    setShowOptionsOverlay(false);
                    setShowPickerOverlay(true);
                  }}
                  onUploadStart={() => {
                    setShowOptionsOverlay(false);
                    setShowUploadingOverlay(true);
                  }}
                />
              </div>
            )}
            {showUploadingOverlay && (
              <div className="fixed inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-md z-40 animate-fadeIn">
                <PhotoPicker 
                  showUploadModal 
                  onCancel={handleCloseOverlay}
                  onOptionsOpen={() => setShowOptionsOverlay(true)}
                  onUploadComplete={() => {
                    setShowUploadingOverlay(false);
                    setShowSuccessOverlay(true);
                  }}
                />
              </div>
            )}
            {showSuccessOverlay && (
              <SuccessModal 
                onClose={handleCloseOverlay}
              />
            )}
          </>
        )}
        {currentScreen === 'picker' && (
          <div className="animate-fadeIn">
            <PhotoPicker 
              onCancel={handleReturnToGallery}
              onOptionsOpen={() => setCurrentScreen('options')}
            />
          </div>
        )}
        {currentScreen === 'options' && (
          <div className="animate-fadeIn">
            <PhotoPicker 
              showOptionsModal 
              onCancel={handleReturnToGallery}
              onOptionsOpen={() => setCurrentScreen('options')}
              onOptionsClose={() => setCurrentScreen('picker')}
              onUploadStart={() => setCurrentScreen('uploading')}
            />
          </div>
        )}
        {currentScreen === 'uploading' && (
          <div className="animate-fadeIn">
            <PhotoPicker 
              showUploadModal 
              onCancel={handleReturnToGallery}
              onOptionsOpen={() => setCurrentScreen('options')}
              onUploadComplete={() => setCurrentScreen('success')}
            />
          </div>
        )}
        {currentScreen === 'success' && (
          <SuccessModal 
            onClose={handleReturnToGallery}
          />
        )}
      </div>
    </div>
  );
}