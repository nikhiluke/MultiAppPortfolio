export type LogType = 'log' | 'error' | 'warn' | 'info' | 'success' | 'table' | 'debug';

export interface LogEntry {
  id: string;
  type: LogType;
  content: any;
  timestamp: string;
}

export interface FileData {
  id: string;
  name: string;
  content: string;
}

export interface LayoutState {
  sidebarWidth: number;
  consoleWidth: number;
  isSidebarVisible: boolean;
  isConsoleVisible: boolean;
}
