import { getTemplates } from '@/lib/templates';
import Link from 'next/link';

export default function TemplatesPage() {
  const templates = getTemplates();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Poweresume
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/editor" className="text-gray-700 hover:text-primary-600">
                Editor
              </Link>
              <Link href="/templates" className="text-gray-700 hover:text-primary-600">
                Templates
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Professional Resume Templates</h1>
          <p className="text-xl text-gray-600">
            Choose from our collection of ATS-friendly LaTeX templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.template_id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Preview Image */}
              <div className="aspect-[8.5/11] bg-gray-100 flex items-center justify-center">
                <span className="text-6xl">📄</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs font-medium">
                    {template.constraints.page_limit} page{template.constraints.page_limit > 1 ? 's' : ''}
                  </span>
                  {template.constraints.max_bullets && (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                      {template.constraints.max_bullets} bullets max
                    </span>
                  )}
                </div>

                <Link
                  href={`/editor?template=${template.template_id}`}
                  className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 font-semibold"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Why Use LaTeX Templates?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Professional Typesetting</h3>
              <p className="text-gray-600">
                LaTeX provides precise control over layout and typography, ensuring 
                your resume looks professional and polished.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">ATS-Friendly</h3>
              <p className="text-gray-600">
                All templates are optimized for Applicant Tracking Systems (ATS), 
                ensuring your resume gets past automated screening.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Consistency</h3>
              <p className="text-gray-600">
                Maintain consistent formatting throughout your resume with semantic 
                markup and reusable styles.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Version Control</h3>
              <p className="text-gray-600">
                LaTeX source files are plain text, making them perfect for version 
                control and tracking changes over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
