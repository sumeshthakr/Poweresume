'use client';

import { Editor } from '@monaco-editor/react';

interface LatexEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LatexEditor({ value, onChange }: LatexEditorProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-100 px-4 py-2 border-b">
        <h3 className="font-semibold">LaTeX Source</h3>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="latex"
          value={value}
          onChange={(newValue) => onChange(newValue || '')}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            wordWrap: 'on',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
