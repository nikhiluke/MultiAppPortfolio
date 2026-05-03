import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Trash2, 
  Play, 
  Terminal, 
  Bug, 
  Sparkles, 
  SkipForward, 
  StopCircle, 
  HardDrive,
  Undo2,
  Redo2
} from 'lucide-react';
import { cn } from './utils';

interface HeaderProps {
  isDebugMode: boolean;
  isSidebarVisible: boolean;
  isConsoleVisible: boolean;
  setIsSidebarVisible: (v: boolean) => void;
  setIsConsoleVisible: (v: boolean) => void;
  runCode: (debug?: boolean) => void;
  nextStep: () => void;
  stopDebug: () => void;
  formatCode: () => void;
  clearConsole: () => void;
  undo: () => void;
  redo: () => void;
}

export function Header(props: HeaderProps) {
  const {
    isDebugMode,
    isSidebarVisible,
    isConsoleVisible,
    setIsSidebarVisible,
    setIsConsoleVisible,
    runCode,
    nextStep,
    stopDebug,
    formatCode,
    clearConsole,
    undo,
    redo
  } = props;

  return (
    <header className="bg-gray-900 border-b border-gray-700/50 px-4 py-2.5 flex justify-between items-center shadow-lg z-20">
      <div className="flex items-center gap-3">
        <motion.div 
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="bg-yellow-400 p-2 rounded-lg shadow-[0_0_15px_rgba(250,204,21,0.2)]"
        >
          <Code2 className="text-gray-900 w-5 h-5" />
        </motion.div>
        <div className="hidden lg:block">
          <h1 className="font-bold text-lg tracking-tight leading-none text-white">
            Online <span className="text-yellow-400">JS Editor</span> <span className="text-xs font-light text-gray-500 ml-1">@Nikhil Uke</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-800 rounded-md p-0.5">
          <button 
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className={cn("p-1.5 rounded transition-colors", isSidebarVisible ? "text-yellow-400 bg-gray-700" : "text-gray-500 hover:text-gray-300")}
            title="Toggle Explorer"
          >
            <HardDrive className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setIsConsoleVisible(!isConsoleVisible)}
            className={cn("p-1.5 rounded transition-colors", isConsoleVisible ? "text-yellow-400 bg-gray-700" : "text-gray-500 hover:text-gray-300")}
            title="Toggle Console"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-800 rounded-md p-0.5">
          <button 
            onClick={undo}
            className="p-1.5 rounded text-gray-500 hover:text-white hover:bg-gray-700 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={redo}
            className="p-1.5 rounded text-gray-500 hover:text-white hover:bg-gray-700 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {isDebugMode ? (
          <div className="flex items-center gap-1 bg-yellow-500/10 p-0.5 sm:p-1 rounded-lg border border-yellow-500/20">
            <button 
              onClick={nextStep}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md text-xs font-bold transition-all shadow-md"
            >
              <SkipForward className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Step Next</span>
            </button>
            <button 
              onClick={stopDebug}
              className="p-1 px-1.5 sm:px-2 text-gray-400 hover:text-red-400"
              title="Stop Debugging"
            >
              <StopCircle className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button 
              onClick={() => runCode(true)}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-gray-400 hover:text-yellow-400 hover:bg-gray-800 rounded-md transition-all text-xs font-medium"
            >
              <Bug className="w-3.5 h-3.5" /> <span className="hidden md:inline">Debug</span>
            </button>
            <button 
              onClick={formatCode}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-md transition-all text-xs font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" /> <span className="hidden md:inline">Format</span>
            </button>
          </div>
        )}
        
        <div className="hidden sm:block h-6 w-[1px] bg-gray-700 mx-1" />
        
        <button 
          onClick={clearConsole}
          className="p-2 text-gray-500 hover:text-gray-300 transition-colors"
          title="Clear Console"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        
        {!isDebugMode && (
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => runCode(false)}
            className="flex items-center gap-2 px-4 sm:px-6 py-1.5 bg-green-600 hover:bg-green-500 rounded-md transition-all font-bold text-xs shadow-lg shadow-green-900/40 text-white uppercase tracking-wider ml-1 sm:ml-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> <span className="hidden sm:inline">Run</span>
          </motion.button>
        )}
      </div>
    </header>
  );
}
