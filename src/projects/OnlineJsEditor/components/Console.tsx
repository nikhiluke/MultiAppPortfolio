import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, ChevronRight, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { LogEntry } from './types';
import { cn } from './utils';

interface ConsoleProps {
  logs: LogEntry[];
  isConsoleVisible: boolean;
  width: number;
  consoleRef: React.RefObject<HTMLDivElement>;
  setIsConsoleVisible: (v: boolean) => void;
  startResizing: (type: 'console', e: React.MouseEvent) => void;
  isMobile: boolean;
}

export function Console(props: ConsoleProps) {
  const { logs, isConsoleVisible, width, consoleRef, setIsConsoleVisible, startResizing, isMobile } = props;

  return (
    <>
      {isConsoleVisible && (
        <div 
          onMouseDown={(e) => startResizing('console', e)}
          className="hidden md:block w-1 hover:w-1.5 bg-transparent hover:bg-yellow-400/30 cursor-col-resize transition-all z-10 shrink-0"
        />
      )}

      <AnimatePresence>
        {isConsoleVisible && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? '100vw' : width, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className={cn(
              "flex flex-col bg-[#0b0e14] border-l border-gray-800 h-full overflow-hidden",
              "fixed inset-y-0 right-0 z-30 md:relative"
            )}
            style={{ width: isMobile ? '100vw' : width }}
          >
            <div className="bg-gray-900/80 px-4 py-1.5 text-[10px] font-bold text-gray-400 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2 uppercase tracking-widest text-[#60a5fa]">
                <Terminal className="w-3 h-3" /> Console Output
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[9px] text-green-500/50 font-mono">
                  STDOUT: CONNECTED
                </div>
                <button 
                  onClick={() => setIsConsoleVisible(false)}
                  className="p-1 hover:bg-gray-800 rounded text-gray-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div 
              ref={consoleRef}
              className="flex-1 overflow-y-auto p-0 font-mono text-[12px] leading-relaxed selection:bg-yellow-400/20"
            >
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 opacity-20 text-center select-none">
                  <Terminal className="w-12 h-12 mb-4" />
                  <p className="text-sm font-sans italic">Ready for execution...</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {logs.map((log) => (
                    <ConsoleLog key={log.id} log={log} />
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface ConsoleLogProps {
  log: LogEntry;
  key?: string | number;
}

function ConsoleLog({ log }: ConsoleLogProps) {
  const isObject = typeof log.content === 'object' && log.content !== null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "border-b border-gray-800/20 p-2.5 flex gap-2.5 transition-colors hover:bg-white/[0.01]",
        log.type === 'error' && "bg-red-500/5 text-red-400 border-red-500/10",
        log.type === 'warn' && "bg-yellow-500/5 text-yellow-300 border-yellow-500/10",
        log.type === 'info' && "text-blue-400 bg-blue-500/5",
        log.type === 'debug' && "text-purple-400 italic",
        log.type === 'success' && "text-green-400 font-bold text-[10px] uppercase tracking-wider py-1.5"
      )}
    >
      <div className="shrink-0 mt-0.5 opacity-30 select-none flex flex-col items-center w-12">
        <span className="text-[8px] font-mono leading-none">{log.timestamp}</span>
        <ChevronRight className="w-3 h-3 mt-1 opacity-50" />
      </div>

      <div className="flex-1 min-w-0">
        {log.type === 'error' && (
          <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold uppercase tracking-tight">
            <AlertCircle className="w-3 h-3" /> Runtime Error
          </div>
        )}
        {log.type === 'info' && (
          <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold uppercase tracking-tight">
            <Info className="w-3 h-3" /> System Out
          </div>
        )}

        <div className="whitespace-pre-wrap break-all">
          {log.type === 'table' || isObject ? (
            <pre className="text-gray-300 text-[11px] overflow-x-auto p-2 bg-black/40 rounded border border-white/5 my-1 font-mono">
              {JSON.stringify(log.content, null, 2)}
            </pre>
          ) : (
            <span>{String(log.content)}</span>
          )}
        </div>
      </div>

      {log.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 mt-0.5" />}
    </motion.div>
  );
}
