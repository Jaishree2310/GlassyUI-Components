import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

export interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  errorMessage?: string;
}

export interface FileUploaderProps {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number; // Maximum individual file size in MB
  accept?: string;
  glassOpacity?: number;
  accentColor?: string; // Color of progress and upload highlight
  multiple?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  maxFiles = 5,
  maxSizeMB = 10,
  accept = '*/*',
  glassOpacity = 0.15,
  accentColor = '#a855f7',
  multiple = true,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileQueue, setFileQueue] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFiles = (filesList: FileList) => {
    const newFiles: File[] = [];
    const validQueueItems: FileItem[] = [];

    const currentCount = fileQueue.length;
    const spaceLeft = maxFiles - currentCount;

    if (spaceLeft <= 0) {
      alert(`Maximum limit of ${maxFiles} files reached.`);
      return;
    }

    const filesToProcess = Array.from(filesList).slice(
      0,
      multiple ? spaceLeft : 1,
    );

    filesToProcess.forEach(file => {
      const sizeMB = file.size / (1024 * 1024);
      let status: FileItem['status'] = 'completed'; // For demo, complete instantly
      let errorMessage = '';

      if (sizeMB > maxSizeMB) {
        status = 'error';
        errorMessage = `File exceeds max size of ${maxSizeMB}MB.`;
      }

      const item: FileItem = {
        id: Math.random().toString(36).substring(7),
        file,
        progress: status === 'completed' ? 100 : 0,
        status,
        errorMessage,
      };

      validQueueItems.push(item);
      if (status !== 'error') {
        newFiles.push(file);
      }
    });

    setFileQueue(prev => [...prev, ...validQueueItems]);
    if (newFiles.length > 0 && onFilesSelected) {
      onFilesSelected(newFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (id: string) => {
    setFileQueue(prev => prev.filter(item => item.id !== id));
  };

  const getDropzoneStyle = () => {
    return {
      backgroundColor: isDragOver
        ? 'rgba(255, 255, 255, 0.2)'
        : `rgba(255, 255, 255, ${glassOpacity})`,
      borderColor: isDragOver ? accentColor : 'rgba(255, 255, 255, 0.2)',
      boxShadow: isDragOver
        ? `0 12px 40px rgba(0, 0, 0, 0.35), 0 0 15px ${accentColor}40`
        : '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    };
  };

  return (
    <div className='w-full space-y-4'>
      {/* Hidden input */}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={accept}
        multiple={multiple && maxFiles > 1}
        className='hidden'
      />

      {/* Dropzone container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        style={getDropzoneStyle()}
        className='relative group p-8 border-2 border-dashed rounded-2xl cursor-pointer text-center backdrop-filter backdrop-blur-lg transition-all duration-300 flex flex-col items-center justify-center min-h-[200px]'
      >
        <div
          className='w-16 h-16 rounded-full flex items-center justify-center border border-white/20 mb-4 transition-all duration-300 group-hover:scale-110'
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: `0 0 10px rgba(255, 255, 255, 0.05)`,
          }}
        >
          <Upload size={28} className='text-white/80' />
        </div>
        <h3 className='text-lg font-bold text-white mb-1'>
          Drag & drop your files here
        </h3>
        <p className='text-sm text-white/50 mb-3'>
          or{' '}
          <span className='underline font-semibold text-white/80 group-hover:text-white transition-colors'>
            browse files
          </span>{' '}
          from your computer
        </p>
        <p className='text-xs text-white/30'>
          Max files: {maxFiles} • Max file size: {maxSizeMB}MB
        </p>
      </div>

      {/* File queue lists */}
      {fileQueue.length > 0 && (
        <div className='space-y-2.5'>
          {fileQueue.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
              className='flex items-center justify-between p-3.5 border rounded-xl backdrop-filter backdrop-blur-sm transition-all duration-300'
            >
              <div className='flex items-center gap-3.5 flex-1 min-w-0 mr-4'>
                <div
                  className='w-10 h-10 rounded-lg flex items-center justify-center border border-white/10'
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <File size={20} className='text-white/70' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-semibold text-white truncate'>
                    {item.file.name}
                  </p>
                  <div className='flex items-center gap-2 mt-1'>
                    <p className='text-xs text-white/40'>
                      {(item.file.size / 1024).toFixed(1)} KB
                    </p>
                    {item.status === 'error' && (
                      <span className='text-xs text-red-400 flex items-center gap-1 font-medium'>
                        <AlertCircle size={12} />
                        {item.errorMessage}
                      </span>
                    )}
                    {item.status === 'completed' && (
                      <span className='text-xs text-emerald-400 flex items-center gap-1 font-medium'>
                        <CheckCircle size={12} />
                        Ready
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  removeFile(item.id);
                }}
                className='p-1.5 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-200'
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
