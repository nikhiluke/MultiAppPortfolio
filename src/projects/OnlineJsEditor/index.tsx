import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePlayground } from './components/usePlayground';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CodeEditor } from './components/CodeEditor';
import { Console } from './components/Console';
import { Footer } from './components/Footer';
// @ts-ignore: CSS import without type declarations
import './components/Playground.css';

export function CustomJSEditor() {
  const playground = usePlayground();

  // Initial run on mount
  useEffect(() => {
    playground.runCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden bg-[#0d1117]">
      <Header 
        isDebugMode={playground.isDebugMode}
        isSidebarVisible={playground.isSidebarVisible}
        isConsoleVisible={playground.isConsoleVisible}
        setIsSidebarVisible={playground.setIsSidebarVisible}
        setIsConsoleVisible={playground.setIsConsoleVisible}
        runCode={playground.runCode}
        nextStep={playground.nextStep}
        stopDebug={playground.stopDebug}
        formatCode={playground.formatCode}
        clearConsole={playground.clearConsole}
        undo={playground.undo}
        redo={playground.redo}
      />

      <main className="flex-1 flex overflow-hidden relative">
        <AnimatePresence>
          {playground.isMobile && (playground.isSidebarVisible || playground.isConsoleVisible) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playground.setIsSidebarVisible(false);
                playground.setIsConsoleVisible(false);
              }}
              className="fixed inset-0 bg-black/60 z-20 md:hidden"
            />
          )}
        </AnimatePresence>

        <Sidebar 
          files={playground.files}
          activeFileId={playground.activeFileId}
          isSidebarVisible={playground.isSidebarVisible}
          width={playground.sidebarWidth}
          setActiveFileId={playground.setActiveFileId}
          setIsSidebarVisible={playground.setIsSidebarVisible}
          addFile={playground.addFile}
          deleteFile={playground.deleteFile}
          renameFile={playground.renameFile}
          startResizing={(type, e) => playground.startResizing(type, e)}
          isMobile={playground.isMobile}
        />

        <CodeEditor 
          activeFileName={playground.activeFile.name}
          code={playground.activeFile.content}
          isDebugMode={playground.isDebugMode}
          currentDebugLine={playground.currentDebugLine}
          isSaving={playground.isSaving}
          isSidebarVisible={playground.isSidebarVisible}
          isConsoleVisible={playground.isConsoleVisible}
          setIsSidebarVisible={playground.setIsSidebarVisible}
          setIsConsoleVisible={playground.setIsConsoleVisible}
          setCode={playground.setCode}
          onEditorCreate={playground.onEditorCreate}
        />

        <Console 
          logs={playground.logs}
          isConsoleVisible={playground.isConsoleVisible}
          width={playground.consoleWidth}
          consoleRef={playground.consoleRef as React.RefObject<HTMLDivElement>}
          setIsConsoleVisible={playground.setIsConsoleVisible}
          startResizing={(type, e) => playground.startResizing(type, e)}
          isMobile={playground.isMobile}
        />
      </main>

      <Footer filesCount={playground.files.length} />
    </div>
  );
}

export default CustomJSEditor;
