import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, FileCode, Edit2, X, HardDrive } from 'lucide-react';
import { FileData } from './types';
import { cn } from './utils';

interface SidebarProps {
  files: FileData[];
  activeFileId: string;
  isSidebarVisible: boolean;
  width: number;
  setActiveFileId: (id: string) => void;
  setIsSidebarVisible: (v: boolean) => void;
  addFile: () => void;
  deleteFile: (id: string, e: React.MouseEvent) => void;
  renameFile: (id: string) => void;
  startResizing: (type: 'sidebar', e: React.MouseEvent) => void;
  isMobile: boolean;
}

export function Sidebar(props: SidebarProps) {
  const {
    files,
    activeFileId,
    isSidebarVisible,
    width,
    setActiveFileId,
    setIsSidebarVisible,
    addFile,
    deleteFile,
    renameFile,
    startResizing,
    isMobile
  } = props;

  return (
    <>
      <AnimatePresence>
        {isSidebarVisible && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? '100vw' : width, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className={cn(
              "bg-gray-900 border-r border-gray-800 flex flex-col shrink-0 overflow-hidden",
              "fixed inset-y-0 left-0 z-30 md:relative md:bg-gray-900/50"
            )}
            style={{ width: isMobile ? '100vw' : width }}
          >
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <HardDrive className="w-3 h-3" /> Explorer
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={addFile}
                  className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => props.setIsSidebarVisible(false)} // Need to pass this down
                  className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white md:hidden"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {files.map(file => (
                <div 
                  key={file.id}
                  onClick={() => setActiveFileId(file.id)}
                  className={cn(
                    "group file-item",
                    activeFileId === file.id ? "file-item-active" : "text-gray-400"
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode className={cn("w-3.5 h-3.5 shrink-0", activeFileId === file.id ? "text-yellow-400" : "text-gray-600")} />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); renameFile(file.id) }}
                      className="p-1 hover:bg-gray-600 rounded"
                    >
                      <Edit2 className="w-2.5 h-2.5" />
                    </button>
                    {files.length > 1 && (
                      <button 
                        onClick={(e) => deleteFile(file.id, e)}
                        className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-red-400"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isSidebarVisible && (
        <div 
          onMouseDown={(e) => startResizing('sidebar', e)}
          className="hidden md:block w-1 hover:w-1.5 bg-transparent hover:bg-yellow-400/30 cursor-col-resize transition-all z-10 shrink-0"
        />
      )}
    </>
  );
}
