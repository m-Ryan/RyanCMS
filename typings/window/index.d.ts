interface Window {
  __INITIAL_STATE__?: {} | undefined | { [key: string]: any; };
  __META_DESCRIPTION__?: string;
  CSS_EXTRACT_COLOR_PLUGIN?:
  | {
    source: string;
    fileName: string;
    matchColors: string[];
  }[]
  | undefined;
  _hmt: string[][];
  __REDUX_DEVTOOLS_EXTENSION__: () => any;
}
