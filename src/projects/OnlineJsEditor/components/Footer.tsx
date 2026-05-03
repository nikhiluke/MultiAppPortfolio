import React from 'react';
import { Cpu } from 'lucide-react';

interface FooterProps {
  filesCount: number;
}

export function Footer({ filesCount }: FooterProps) {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 px-4 py-2 text-[10px] text-gray-500 flex justify-between items-center shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="font-medium tracking-wide opacity-70">RUNTIME: V8-ISOLATED</span>
        </div>
        <div className="h-3 w-[1px] bg-gray-800" />
        <div className="flex items-center gap-2">
           <span className="text-gray-600">Files: {filesCount}</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors cursor-default">
          <Cpu className="w-3 h-3" /> 
          <span className="hidden sm:inline">Engine: Optimized</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-gray-600">
           <span>Cmd+Enter (Run)</span>
           <span>Cmd+Shift+F (Format)</span>
        </div>
      </div>
    </footer>
  );
}
