import { Bold } from './Bold';
import { Italic } from './Italic';
import { FontColor } from './FontColor';
import { BgColor } from './BgColor';
import { Link } from './Link';
import { Picture } from './Picture';
import { Code } from './Code';
import { Quote } from './Quote';
import { OrderList } from './OrderList';

export type PluginItemProps<T extends any = any> = {
  editor: HTMLTextAreaElement;
  onChange: (payload: {
    value: string;
    selectionStart: number;
    selectionEnd: number;
  }) => void;
  payload?: T;
};
export type PluginItem = {
  tip: string;
  content: (props: PluginItemProps) => JSX.Element;
};

export const plugins: PluginItem[] = [
  Bold,
  Italic,
  FontColor,
  BgColor,
  Link,
  Picture,
  Code,
  Quote,
  OrderList
];