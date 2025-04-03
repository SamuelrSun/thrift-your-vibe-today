
import { useState, useRef } from 'react';
import { Image, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ItemImageUploadProps {
  images: File[];
  onChange: (files: File[]) => void;
}

const ItemImageUpload = ({ images, onChange }: ItemImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...images, ...newFiles].slice(0, 5); // Limit to 5 images
      
      // Generate previews
      const newPreviews = updatedFiles.map(file => URL.createObjectURL(file));
      
      // Clean up old previews to prevent memory leaks
      previews.forEach(preview => URL.revokeObjectURL(preview));
      
      setPreviews(newPreviews);
      onChange(updatedFiles);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...images];
    updatedFiles.splice(index, 1);
    
    // Clean up preview
    URL.revokeObjectURL(previews[index]);
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    
    setPreviews(updatedPreviews);
    onChange(updatedFiles);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4 w-full text-center">
      <div className="flex flex-wrap gap-4 w-full justify-center">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img 
              src={preview} 
              alt={`Item preview ${index + 1}`} 
              className="w-28 h-28 object-cover rounded-md border border-gray-200"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {/* Upload button */}
        {images.length < 5 && (
          <button
            type="button"
            onClick={triggerFileInput}
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center hover:border-thrift-sage transition-colors mx-4 max-w-xl"
          >
            <Image className="w-10 h-10 text-gray-400" />
            <span className="text-sm mt-3 text-gray-500">Add Image</span>
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />

      <div className="flex justify-center w-full mt-4">
        <Button
          type="button"
          onClick={triggerFileInput}
          variant="outline"
          className="text-thrift-sage border-thrift-sage"
          disabled={images.length >= 5}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Photos ({images.length}/5)
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Upload up to 5 high-quality images. Each image should be less than 5MB.
      </p>
    </div>
  );
};

export default ItemImageUpload;
