import { Crown, Maximize2, Layers, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface ProcessingOptionsProps {
  onProceed: () => void;
  onCancel: () => void;
  selectedCount: number;
}

export function ProcessingOptions({ onProceed, onCancel, selectedCount }: ProcessingOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleOption = (option: string) => {
    setSelectedOption(prev => prev === option ? null : option);
  };

  const isSelected = (option: string) => selectedOption === option;

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 backdrop-blur-md animate-fadeIn">
      <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-2xl rounded-3xl p-6 w-full max-w-sm mx-4 shadow-2xl border border-white/20 dark:border-neutral-700/50">
        <h2 className="mb-6 text-center text-neutral-900 dark:text-neutral-100">
          Processing Options
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Upgrade to Pro Card - Full Width */}
          <button className="col-span-2 p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-left hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white mb-0.5">Upgrade to Pro!</h3>
                <p className="text-blue-100 text-sm">
                  Enjoy all benefits without any restrictions
                </p>
              </div>
            </div>
          </button>

          {/* Resize Option */}
          <button 
            onClick={() => toggleOption('resize')}
            className={`aspect-square p-4 rounded-2xl text-left active:scale-95 transition-all border ${
              isSelected('resize')
                ? 'bg-blue-500 border-blue-600 dark:bg-blue-600 dark:border-blue-700'
                : 'bg-neutral-200 dark:bg-neutral-700 border-neutral-300/50 dark:border-neutral-600/50 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isSelected('resize')
                  ? 'bg-white/20'
                  : 'bg-white dark:bg-neutral-800'
              }`}>
                <Maximize2 className={`w-5 h-5 ${
                  isSelected('resize')
                    ? 'text-white'
                    : 'text-neutral-700 dark:text-white'
                }`} />
              </div>
              <div className="text-center">
                <h3 className={`mb-0.5 ${
                  isSelected('resize')
                    ? 'text-white'
                    : 'text-neutral-900 dark:text-white'
                }`}>Resize</h3>
                <p className={`text-xs ${
                  isSelected('resize')
                    ? 'text-blue-100'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}>
                  Adjust dimensions
                </p>
              </div>
            </div>
          </button>

          {/* Compress Option */}
          <button 
            onClick={() => toggleOption('compress')}
            className={`aspect-square p-4 rounded-2xl text-left active:scale-95 transition-all border ${
              isSelected('compress')
                ? 'bg-blue-500 border-blue-600 dark:bg-blue-600 dark:border-blue-700'
                : 'bg-neutral-200 dark:bg-neutral-700 border-neutral-300/50 dark:border-neutral-600/50 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isSelected('compress')
                  ? 'bg-white/20'
                  : 'bg-white dark:bg-neutral-800'
              }`}>
                <Layers className={`w-5 h-5 ${
                  isSelected('compress')
                    ? 'text-white'
                    : 'text-neutral-700 dark:text-white'
                }`} />
              </div>
              <div className="text-center">
                <h3 className={`mb-0.5 ${
                  isSelected('compress')
                    ? 'text-white'
                    : 'text-neutral-900 dark:text-white'
                }`}>Compress</h3>
                <p className={`text-xs ${
                  isSelected('compress')
                    ? 'text-blue-100'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}>
                  Reduce file size
                </p>
              </div>
            </div>
          </button>

          {/* Convert Option */}
          <button 
            onClick={() => toggleOption('convert')}
            className={`col-span-2 p-4 rounded-2xl text-left active:scale-95 transition-all border ${
              isSelected('convert')
                ? 'bg-blue-500 border-blue-600 dark:bg-blue-600 dark:border-blue-700'
                : 'bg-neutral-200 dark:bg-neutral-700 border-neutral-300/50 dark:border-neutral-600/50 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                isSelected('convert')
                  ? 'bg-white/20'
                  : 'bg-white dark:bg-neutral-800'
              }`}>
                <RefreshCw className={`w-5 h-5 ${
                  isSelected('convert')
                    ? 'text-white'
                    : 'text-neutral-700 dark:text-white'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`mb-0.5 ${
                  isSelected('convert')
                    ? 'text-white'
                    : 'text-neutral-900 dark:text-white'
                }`}>Convert</h3>
                <p className={`text-sm ${
                  isSelected('convert')
                    ? 'text-blue-100'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}>
                  Change image format
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="flex-1 px-6 py-3.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onProceed}
            disabled={selectedOption === null}
            className={`flex-1 px-6 py-3.5 rounded-full transition-colors shadow-lg ${
              selectedOption === null
                ? 'bg-neutral-300 dark:bg-neutral-600 text-neutral-400 dark:text-neutral-500 cursor-not-allowed shadow-none'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-blue-500/30'
            }`}
          >
            Upload ({selectedCount})
          </button>
        </div>
      </div>
    </div>
  );
}