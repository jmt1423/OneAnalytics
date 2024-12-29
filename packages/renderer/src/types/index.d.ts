export interface IElectronAPI {
  sendData: (channel: string, value: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
