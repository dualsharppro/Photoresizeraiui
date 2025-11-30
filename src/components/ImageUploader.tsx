import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

export function ImageUploader() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        newImages.push({
          id: Math.random().toString(36).substr(2, 9),
          url,
          name: file.name,
        });
      }
    });

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <ImageIcon className="w-6 h-6 text-neutral-700" />
          <h1>Upload de Imagens</h1>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-colors duration-200
            ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-neutral-300 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100'
            }
          `}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
          <p className="text-neutral-600 mb-2">
            Arraste e solte suas imagens aqui
          </p>
          <p className="text-neutral-400">ou clique para selecionar</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {images.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4">Imagens ({images.length})</h2>
            <div className="grid grid-cols-2 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 bg-white border-t border-neutral-200">
                    <p className="text-neutral-700 truncate">{image.name}</p>
                  </div>
                  <button
                    onClick={() => removeImage(image.id)}
                    className="
                      absolute top-2 right-2 p-1.5 rounded-full
                      bg-white shadow-md border border-neutral-200
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      hover:bg-red-50 hover:border-red-300
                    "
                    aria-label="Remover imagem"
                  >
                    <X className="w-4 h-4 text-neutral-700" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
