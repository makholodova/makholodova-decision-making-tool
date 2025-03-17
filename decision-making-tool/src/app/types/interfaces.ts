export interface Route {
  path: string;
  callback: (resource?: string) => Promise<void>;
}
export interface RequestParameters {
  path: string;
}
export interface OptionData {
  id: string;
  title: string;
  weight: string;
}
