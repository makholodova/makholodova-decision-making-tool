export type ElementCreatorParameters = {
  tag: string;
  classNames?: string[];
  textContent?: string;
  callback?: (event: Event) => void;
  attributes?: Record<string, string>;
};
