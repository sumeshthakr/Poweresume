'use client';

import { useEffect, useState } from 'react';

interface PDFPreviewProps {
  latexCode: string;
}

export default function PDFPreview({ latexCode }: PDFPreviewProps) {
  const [previewMode, setPreviewMode] = useState<'live' | 'placeholder'>('placeholder');

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
        <h3 className="font-semibold">PDF Preview</h3>
        <button
          className="text-sm text-primary-600 hover:text-primary-700"
          onClick={() => alert('Refresh preview (requires LaTeX compilation service)')}
        >
          Refresh
        </button>
      </div>
      <div className="flex-1 bg-gray-50 p-4 overflow-auto">
        {previewMode === 'placeholder' ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-gray-600 mb-2">PDF Preview</p>
              <p className="text-sm text-gray-500 mb-4">
                LaTeX compilation requires backend service
              </p>
              <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto text-left">
                <h4 className="font-semibold mb-2">Preview Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real-time compilation (1-3 seconds)</li>
                  <li>• Sandboxed LaTeX environment</li>
                  <li>• Error highlighting</li>
                  <li>• Page-by-page rendering</li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">
                  For now, you can export the .tex file and compile it locally using 
                  pdflatex or an online LaTeX editor like Overleaf.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded">
            <iframe
              className="w-full h-full"
              title="PDF Preview"
            />
          </div>
        )}
      </div>
    </div>
  );
}
