import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/parser-babel';
import * as parserEstree from 'prettier/plugins/estree';
import { EditorView } from '@uiw/react-codemirror';
import { undo as undoCommand, redo as redoCommand } from '@codemirror/commands';
import { FileData, LogEntry, LogType } from './types';
import { INITIAL_FILES } from './constants';

export function usePlayground() {
  const [files, setFiles] = useState<FileData[]>(() => {
    const saved = localStorage.getItem('js-playground-files');
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });
  const [activeFileId, setActiveFileId] = useState<string>(files[0]?.id || '1');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // Layout State
  const [sidebarWidth, setSidebarWidth] = useState(() => Number(localStorage.getItem('js-playground-sidebar-width')) || 240);
  const [consoleWidth, setConsoleWidth] = useState(() => Number(localStorage.getItem('js-playground-console-width')) || 380);
  const [isSidebarVisible, setIsSidebarVisible] = useState(() => localStorage.getItem('js-playground-sidebar-visible') !== 'false');
  const [isConsoleVisible, setIsConsoleVisible] = useState(() => localStorage.getItem('js-playground-console-visible') !== 'false');
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  // Debugger State
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [debugGenerator, setDebugGenerator] = useState<Generator | null>(null);
  const [currentDebugLine, setCurrentDebugLine] = useState<number | null>(null);

  const consoleRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorView | null>(null);
  const resizerRef = useRef<{ type: 'sidebar' | 'console', startX: number, startWidth: number } | null>(null);

  // Track window size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeFile = useMemo(() => 
    files.find(f => f.id === activeFileId) || files[0],
    [files, activeFileId]
  );

  const setCode = useCallback((newCode: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: newCode } : f));
  }, [activeFileId]);

  const onEditorCreate = useCallback((view: EditorView) => {
    editorRef.current = view;
  }, []);

  const undo = useCallback(() => {
    if (editorRef.current) {
      undoCommand(editorRef.current);
    }
  }, []);

  const redo = useCallback(() => {
    if (editorRef.current) {
      redoCommand(editorRef.current);
    }
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem('js-playground-files', JSON.stringify(files));
    localStorage.setItem('js-playground-sidebar-width', sidebarWidth.toString());
    localStorage.setItem('js-playground-console-width', consoleWidth.toString());
    localStorage.setItem('js-playground-sidebar-visible', isSidebarVisible.toString());
    localStorage.setItem('js-playground-console-visible', isConsoleVisible.toString());
    
    setIsSaving(true);
    const timer = setTimeout(() => setIsSaving(false), 500);
    return () => clearTimeout(timer);
  }, [files, sidebarWidth, consoleWidth, isSidebarVisible, isConsoleVisible]);

  // Resizing logic
  const startResizing = useCallback((type: 'sidebar' | 'console', e: React.MouseEvent) => {
    resizerRef.current = {
      type,
      startX: e.clientX,
      startWidth: type === 'sidebar' ? sidebarWidth : consoleWidth
    };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [sidebarWidth, consoleWidth]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizerRef.current) return;
      
      const { type, startX, startWidth } = resizerRef.current;
      const delta = e.clientX - startX;
      
      if (type === 'sidebar') {
        const newWidth = Math.max(150, Math.min(500, startWidth + delta));
        setSidebarWidth(newWidth);
      } else {
        const newWidth = Math.max(200, Math.min(800, startWidth - delta));
        setConsoleWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      resizerRef.current = null;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const appendLog = useCallback((content: any, type: LogType = 'log') => {
    const newEntry: LogEntry = {
      id: Math.random().toString(36).substring(7),
      type,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setLogs(prev => [...prev, newEntry]);
  }, []);

  const clearConsole = useCallback(() => {
    setLogs([]);
  }, []);

  const runCode = useCallback((isDebugging: boolean = false) => {
    setLogs([]);
    setCurrentDebugLine(null);
    
    const customConsole = {
      log: (msg: any) => appendLog(msg, 'log'),
      error: (msg: any) => appendLog(msg, 'error'),
      warn: (msg: any) => appendLog(msg, 'warn'),
      info: (msg: any) => appendLog(msg, 'info'),
      table: (msg: any) => appendLog(msg, 'table'),
      debug: (msg: any) => appendLog(msg, 'debug')
    };

    if (isDebugging) {
      const lines = activeFile.content.split('\n');
      const instrumentedCode = lines.map((line, idx) => {
        if (!line.trim() || line.trim().startsWith('//')) return line;
        return `yield ${idx + 1}; ${line}`;
      }).join('\n');

      try {
        const GenFunc = Object.getPrototypeOf(function*(){}).constructor;
        const generator = new GenFunc('console', instrumentedCode)(customConsole);
        setDebugGenerator(generator);
        setIsDebugMode(true);
        appendLog('Debug Session Started. Use "Next Step" to proceed.', 'info');
      } catch (err: any) {
        appendLog(err.toString(), 'error');
      }
    } else {
      try {
        const execute = new Function('console', activeFile.content);
        execute(customConsole);
        appendLog('Execution Finished Successfully', 'success');
      } catch (err: any) {
        appendLog(err.toString(), 'error');
      }
    }
  }, [activeFile.content, appendLog]);

  const nextStep = useCallback(() => {
    if (!debugGenerator) return;
    try {
      const { value, done } = debugGenerator.next();
      if (done) {
        setIsDebugMode(false);
        setDebugGenerator(null);
        setCurrentDebugLine(null);
        appendLog('Debug Session Finished', 'success');
      } else {
        setCurrentDebugLine(value as number);
      }
    } catch (err: any) {
      appendLog(err.toString(), 'error');
      setIsDebugMode(false);
      setDebugGenerator(null);
    }
  }, [debugGenerator, appendLog]);

  const stopDebug = useCallback(() => {
    setIsDebugMode(false);
    setDebugGenerator(null);
    setCurrentDebugLine(null);
    appendLog('Debug Session Terminated', 'warn');
  }, [appendLog]);

  const formatCode = async () => {
    try {
      const formatted = await prettier.format(activeFile.content, {
        parser: 'babel',
        plugins: [parserBabel, parserEstree],
        semi: true,
        singleQuote: true,
      });
      setCode(formatted);
      appendLog('Code Formatted', 'info');
    } catch (err: any) {
      appendLog('Format Error: ' + err.message, 'error');
    }
  };

  const addFile = () => {
    const newId = Math.random().toString(36).substring(7);
    const newFile: FileData = {
      id: newId,
      name: `file_${files.length + 1}.js`,
      content: '// New file\n'
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newId);
  };

  const deleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (files.length <= 1) return;
    setFiles(prev => prev.filter(f => f.id !== id));
    if (activeFileId === id) {
      setActiveFileId(files.find(f => f.id !== id)?.id || '1');
    }
  };

  const renameFile = (id: string) => {
    const file = files.find(f => f.id === id);
    if (!file) return;
    const newName = prompt('Enter new file name:', file.name);
    if (newName && newName.trim()) {
      setFiles(prev => prev.map(f => f.id === id ? { ...f, name: newName.trim() } : f));
    }
  };

  return {
    files,
    activeFileId,
    activeFile,
    logs,
    isSaving,
    sidebarWidth,
    consoleWidth,
    isSidebarVisible,
    isConsoleVisible,
    isDebugMode,
    currentDebugLine,
    consoleRef,
    setActiveFileId,
    setIsSidebarVisible,
    setIsConsoleVisible,
    startResizing,
    setCode,
    runCode,
    nextStep,
    stopDebug,
    formatCode,
    addFile,
    deleteFile,
    renameFile,
    clearConsole,
    undo,
    redo,
    onEditorCreate,
    isMobile
  };
}
