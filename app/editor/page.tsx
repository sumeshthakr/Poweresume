'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import TemplateSelector from '@/components/TemplateSelector';
import JobInput from '@/components/JobInput';
import LatexEditor from '@/components/LatexEditor';
import PDFPreview from '@/components/PDFPreview';
import ChatInterface from '@/components/ChatInterface';
import type { Resume, Job } from '@/lib/schemas';
import { parseResume } from '@/lib/parsers';
import { parseJob } from '@/lib/jobParser';
import { renderLatex } from '@/lib/templates';

export default function EditorPage() {
  const [step, setStep] = useState<'upload' | 'template' | 'job' | 'edit'>('upload');
  const [resume, setResume] = useState<Partial<Resume> | null>(null);
  const [job, setJob] = useState<Partial<Job> | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [latexCode, setLatexCode] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string>('');

  const handleFileUpload = async (file: File) => {
    try {
      const parsedResume = await parseResume(file);
      setResume(parsedResume);
      setStep('template');
    } catch (error) {
      console.error('Error parsing resume:', error);
      alert('Failed to parse resume. Please try again.');
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (resume) {
      const latex = renderLatex(resume, templateId);
      setLatexCode(latex);
    }
    setStep('job');
  };

  const handleJobSubmit = async (jobText: string) => {
    try {
      const parsedJob = await parseJob(jobText);
      setJob(parsedJob);
      setStep('edit');
    } catch (error) {
      console.error('Error parsing job:', error);
      alert('Failed to parse job description. Please try again.');
    }
  };

  const handleLatexChange = (newCode: string) => {
    setLatexCode(newCode);
  };

  const handleExport = (format: 'pdf' | 'tex' | 'docx') => {
    if (format === 'tex') {
      // Download LaTeX file
      const blob = new Blob([latexCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.tex';
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // Download PDF (placeholder - would need backend compilation)
      alert('PDF export requires LaTeX compilation service. Coming soon!');
    } else if (format === 'docx') {
      alert('DOCX export coming soon!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-600">Poweresume Editor</h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-primary-600">
                Save
              </button>
              <button className="text-gray-600 hover:text-primary-600">
                Versions
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport('tex')}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Export .tex
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                >
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center space-x-4">
          {[
            { id: 'upload', label: 'Upload' },
            { id: 'template', label: 'Template' },
            { id: 'job', label: 'Job' },
            { id: 'edit', label: 'Edit' },
          ].map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === s.id
                    ? 'bg-primary-600 text-white'
                    : resume || i === 0
                    ? 'bg-primary-200 text-primary-600'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {i + 1}
              </div>
              <span className="ml-2 text-sm font-medium">{s.label}</span>
              {i < 3 && <div className="w-12 h-0.5 bg-gray-300 mx-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {step === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        )}

        {step === 'template' && (
          <div>
            <TemplateSelector
              onTemplateSelect={handleTemplateSelect}
              selectedTemplate={selectedTemplate}
            />
          </div>
        )}

        {step === 'job' && (
          <div className="max-w-2xl mx-auto">
            <JobInput onJobSubmit={handleJobSubmit} />
            <button
              onClick={() => setStep('edit')}
              className="mt-4 text-primary-600 hover:text-primary-700"
            >
              Skip for now →
            </button>
          </div>
        )}

        {step === 'edit' && (
          <div className="grid grid-cols-12 gap-4 h-[calc(100vh-250px)]">
            {/* Chat Panel */}
            <div className="col-span-3 bg-white rounded-lg shadow overflow-hidden">
              <ChatInterface
                resume={resume}
                job={job}
                onLatexUpdate={handleLatexChange}
              />
            </div>

            {/* LaTeX Editor */}
            <div className="col-span-5 bg-white rounded-lg shadow overflow-hidden">
              <LatexEditor
                value={latexCode}
                onChange={handleLatexChange}
              />
            </div>

            {/* PDF Preview */}
            <div className="col-span-4 bg-white rounded-lg shadow overflow-hidden">
              <PDFPreview latexCode={latexCode} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
