'use client';

import { getTemplates } from '@/lib/templates';
import { useState } from 'react';

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void;
  selectedTemplate: string;
}

export default function TemplateSelector({
  onTemplateSelect,
  selectedTemplate,
}: TemplateSelectorProps) {
  const templates = getTemplates();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
      <p className="text-gray-600 mb-6">
        Select a professional LaTeX template that matches your style and industry.
        All templates are ATS-friendly and optimized for readability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.template_id}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg
              ${selectedTemplate === template.template_id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
              }
            `}
            onClick={() => onTemplateSelect(template.template_id)}
          >
            {/* Template Preview Image Placeholder */}
            <div className="aspect-[8.5/11] bg-gray-100 rounded mb-4 flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {template.constraints.page_limit} page{template.constraints.page_limit > 1 ? 's' : ''}
              </span>
              {template.constraints.max_bullets && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Max {template.constraints.max_bullets} bullets
                </span>
              )}
            </div>

            {selectedTemplate === template.template_id && (
              <div className="mt-4 text-primary-600 font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Selected
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onTemplateSelect(selectedTemplate)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-semibold"
        >
          Continue with {templates.find(t => t.template_id === selectedTemplate)?.name}
        </button>
      </div>
    </div>
  );
}
