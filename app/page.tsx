import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">Poweresume</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/editor" className="text-gray-700 hover:text-primary-600">
                Editor
              </Link>
              <Link href="/templates" className="text-gray-700 hover:text-primary-600">
                Templates
              </Link>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            Tailor Your Resume with
            <span className="text-primary-600"> AI Power</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your resume, paste a job description, and get an ATS-friendly, 
            professionally formatted resume tailored to the position. Real-time editing, 
            LaTeX templates, and intelligent optimization.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link 
              href="/editor"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition"
            >
              Start Tailoring
            </Link>
            <Link
              href="/templates"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition"
            >
              Browse Templates
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="text-xl font-bold mb-2">Smart Parsing</h3>
            <p className="text-gray-600">
              Upload PDF, LaTeX, or DOCX resumes. Our parser extracts structured data 
              while preserving your formatting and content.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">Professional Templates</h3>
            <p className="text-gray-600">
              Choose from 12+ ATS-friendly LaTeX templates optimized for different 
              industries and seniority levels.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Optimization</h3>
            <p className="text-gray-600">
              AI analyzes job requirements and tailors your resume, emphasizing 
              relevant skills and experiences while maintaining truthfulness.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Real-time Editing</h3>
            <p className="text-gray-600">
              Edit LaTeX source with syntax highlighting and see live PDF preview. 
              Chat with AI for iterative improvements.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Change Tracking</h3>
            <p className="text-gray-600">
              Every AI modification is tracked with diff view. Understand what changed 
              and why, with full undo/redo support.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-3xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">Multiple Exports</h3>
            <p className="text-gray-600">
              Export to PDF, LaTeX source, and DOCX. Keep version history and 
              maintain multiple tailored versions for different jobs.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Upload Resume</h4>
              <p className="text-sm text-gray-600">Upload your existing resume in PDF, LaTeX, or DOCX format</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Choose Template</h4>
              <p className="text-sm text-gray-600">Select a professional template that matches your style</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Add Job Description</h4>
              <p className="text-sm text-gray-600">Paste the job posting you're applying for</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h4 className="font-semibold mb-2">Tailor & Export</h4>
              <p className="text-sm text-gray-600">AI tailors your resume, you review and export</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 bg-primary-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-xl mb-8 opacity-90">
            Create your first tailored resume in minutes. No credit card required.
          </p>
          <Link
            href="/editor"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started for Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Poweresume. Built with Next.js and AI. Open source on GitHub.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
