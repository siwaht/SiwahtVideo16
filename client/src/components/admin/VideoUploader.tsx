import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, FileVideo } from "lucide-react";

interface VideoUploaderProps {
  onVideoSelected: (file: File) => void;
  onClear?: () => void;
  className?: string;
}

/**
 * Simple video file uploader that handles local file selection
 * without requiring object storage configuration.
 */
export function VideoUploader({ onVideoSelected, onClear, className }: VideoUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const acceptedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mov', 'video/avi'];
  const maxSize = 100 * 1024 * 1024; // 100MB

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please select a video file (MP4, WebM, OGG, MOV, AVI)",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Video file must be less than 100MB",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onVideoSelected(file);
      toast({
        title: "Video Selected",
        description: `${file.name} ready for upload`,
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClear?.();
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200
            ${dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
          onClick={handleButtonClick}
        >
          <FileVideo className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-600 mb-2">
            Drop video file here or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports MP4, WebM, OGG, MOV, AVI up to 100MB
          </p>
          <Button 
            type="button"
            className="mt-4 bg-green-600 hover:bg-green-700"
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick();
            }}
          >
            <Upload className="h-4 w-4 mr-2" />
            Select Video File
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileVideo className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-green-800">{selectedFile.name}</p>
                <p className="text-sm text-green-600">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-green-700 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}