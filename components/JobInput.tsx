'use client';

import { useState } from 'react';

interface JobInputProps {
  onJobSubmit: (jobText: string) => void;
}

export default function JobInput({ onJobSubmit }: JobInputProps) {
  const [mode, setMode] = useState<'url' | 'text'>('text');
  const [jobUrl, setJobUrl] = useState('');
  const [jobText, setJobText] = useState('');

  const handleSubmit = () => {
    if (mode === 'text' && jobText) {
      onJobSubmit(jobText);
    } else if (mode === 'url' && jobUrl) {
      onJobSubmit(jobUrl);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Add Job Description (Optional)</h2>
      <p className="text-gray-600 mb-6">
        Provide the job posting you're applying for. Our AI will analyze the requirements 
        and tailor your resume to emphasize relevant skills and experiences.
      </p>

      {/* Mode Toggle */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            mode === 'text'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setMode('text')}
        >
          Paste Text
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            mode === 'url'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setMode('url')}
        >
          Enter URL
        </button>
      </div>

      {mode === 'text' ? (
        <textarea
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          placeholder="Paste the job description here...&#10;&#10;Include:&#10;- Job title&#10;- Responsibilities&#10;- Required skills&#10;- Preferred qualifications"
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      ) : (
        <div>
          <input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            placeholder="https://example.com/job-posting"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="mt-2 text-sm text-amber-600">
            Note: URL fetching requires backend API. For now, please use "Paste Text" mode.
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          disabled={(!jobText && mode === 'text') || (!jobUrl && mode === 'url')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Analyze Job & Continue
        </button>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">Privacy Notice</h3>
        <p className="text-sm text-yellow-800">
          Your resume and job description data are processed client-side and never 
          stored on our servers without your explicit consent.
        </p>
      </div>
    </div>
  );
}
