import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  selectedImages: File[];
  onRemoveImage: (index: number) => void;
}

export const ImageUpload = ({ onImagesSelected, selectedImages, onRemoveImage }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      onImagesSelected([...selectedImages, ...files]);
    }
  }, [selectedImages, onImagesSelected]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onImagesSelected([...selectedImages, ...files]);
    }
  };

  return (
    <div className="space-y-4">
      <Card 
        className={cn(
          "relative border-2 border-dashed transition-all duration-300 ease-smooth",
          "hover:shadow-card cursor-pointer bg-gradient-card",
          isDragOver ? "border-primary bg-primary/5 shadow-glow" : "border-border"
        )}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
              isDragOver ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
            )}>
              <Camera className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Upload Crop Images
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop images here, or click to select files
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: JPG, PNG, WEBP (Max 10MB each)
              </p>
            </div>

            <Button 
              variant="outline" 
              className="relative"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Images
            </Button>

            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </Card>

      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedImages.map((file, index) => (
            <div key={index} className="relative group">
              <Card className="overflow-hidden bg-gradient-card hover:shadow-card transition-all duration-300">
                <div className="aspect-square relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-6 h-6 p-0"
                    onClick={() => onRemoveImage(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};