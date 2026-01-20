'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploading(true);
      onFileUpload(acceptedFiles[0]);
      setTimeout(() => setUploading(false), 1000);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.tex'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
  });

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>
      <p className="text-gray-600 mb-6">
        Upload your existing resume in PDF, LaTeX (.tex), or DOCX format. 
        We'll extract the structured information for you.
      </p>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="text-6xl mb-4">📄</div>
        
        {uploading ? (
          <p className="text-lg text-gray-600">Processing...</p>
        ) : isDragActive ? (
          <p className="text-lg text-primary-600">Drop your resume here</p>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-2">
              Drag and drop your resume here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: PDF, LaTeX (.tex), DOCX
            </p>
          </>
        )}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• We'll parse your resume and extract structured data</li>
          <li>• You'll review the extracted information for accuracy</li>
          <li>• Choose a professional LaTeX template</li>
          <li>• Optionally add a job description for AI tailoring</li>
        </ul>
      </div>
    </div>
  );
}
