import React, { useMemo } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Clock, ChevronRight } from 'lucide-react';
import { cn } from './utils';

interface CodeEditorProps {
  activeFileName: string;
  code: string;
  isDebugMode: boolean;
  currentDebugLine: number | null;
  isSaving: boolean;
  isSidebarVisible: boolean;
  isConsoleVisible: boolean;
  setIsSidebarVisible: (v: boolean) => void;
  setIsConsoleVisible: (v: boolean) => void;
  setCode: (code: string) => void;
  onEditorCreate?: (view: EditorView) => void;
}

export function CodeEditor(props: CodeEditorProps) {
  const {
    activeFileName,
    code,
    isDebugMode,
    currentDebugLine,
    isSaving,
    isSidebarVisible,
    isConsoleVisible,
    setIsSidebarVisible,
    setIsConsoleVisible,
    setCode,
    onEditorCreate
  } = props;

  const extensions = useMemo(() => [javascript({ jsx: true })], []);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="bg-gray-900/80 px-4 py-1.5 text-xs font-mono text-gray-400 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          {!isSidebarVisible && (
            <button 
              onClick={() => setIsSidebarVisible(true)}
              className="p-1 hover:bg-gray-800 rounded text-gray-500 hover:text-white transition-colors"
              title="Show Explorer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className={cn("w-2 h-2 rounded-full", isDebugMode ? "bg-red-500 animate-pulse" : "bg-blue-500 opacity-75")} />
            <span className="font-semibold text-gray-300">{activeFileName}</span>
          </div>
          {currentDebugLine && (
            <div className="bg-yellow-500/20 text-yellow-500 px-2 rounded border border-yellow-500/30 text-[10px] font-bold">
              STEP AT LINE: {currentDebugLine}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          {!isConsoleVisible && (
            <button 
              onClick={() => setIsConsoleVisible(true)}
              className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded border border-gray-700 transition-colors mr-2"
            >
               Show Console <ChevronRight className="w-3 h-3 rotate-180" />
            </button>
          )}
          {isSaving ? (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3 animate-spin" /> saving...
            </div>
          ) : (
            <span className="text-green-500/70">Local Persistence Active</span>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <CodeMirror
          value={code}
          height="100%"
          theme={dracula}
          extensions={extensions}
          onChange={setCode}
          onCreateEditor={onEditorCreate}
          className="h-full text-[14px]"
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
          }}
        />
        {isDebugMode && currentDebugLine && (
           <div 
             className="absolute left-0 right-0 h-6 bg-yellow-500/10 pointer-events-none border-y border-yellow-500/20 z-0"
             style={{ top: `${(currentDebugLine - 1) * 1.5}rem` }}
           />
        )}
      </div>
    </div>
  );
}
