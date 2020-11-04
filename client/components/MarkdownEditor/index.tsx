import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import styles from './index.module.scss';
import { plugins, PluginItemProps } from './components/plugins';
import { Drawer } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useMarkdownRender } from '@/client/hooks/useMarkdownRender';

export type StepItem = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
  scrollTop: number;
};

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor(props: Props) {
  const { markdownRender } = useMarkdownRender();
  const { value, placeholder } = props;
  const [fullScreen, setFullscreen] = useState(false);
  const [sectionRange, setSectionRange] = useState({
    selectionStart: 0,
    selectionEnd: 0,
  });
  const ref = useRef<HTMLTextAreaElement>(null);

  const editor = ref.current;

  const onCallChange = useCallback(
    (value: string) => {
      props.onChange(value);
    },
    [props]
  );

  const onPluginCallChange = useCallback(
    (payload: Parameters<PluginItemProps['onChange']>[0]) => {
      const { value, selectionStart, selectionEnd } = payload;

      setSectionRange({ selectionStart, selectionEnd });
      onCallChange(value);
    },
    [onCallChange]
  );

  useLayoutEffect(() => {
    const isBlur =
      sectionRange.selectionStart === 0 && sectionRange.selectionEnd === 0;
    if (editor && !isBlur) {
      editor.focus();
      editor.setSelectionRange(
        sectionRange.selectionStart,
        sectionRange.selectionEnd
      );
      setSectionRange({
        selectionStart: 0,
        selectionEnd: 0,
      });
    }
  }, [editor, sectionRange.selectionEnd, sectionRange.selectionStart]);

  const renderTools = useMemo(() => {
    return (
      <div className={styles['editor-tool']}>
        {plugins.map((plugin, index) => {
          return (
            <a key={index} title={plugin.tip}>
              <plugin.content
                editor={ref.current!}
                onChange={onPluginCallChange}
              />
            </a>
          );
        })}
        <a key='全屏' title='全屏'>
          {fullScreen ? (
            <FullscreenExitOutlined onClick={() => setFullscreen(false)} />
          ) : (
            <FullscreenOutlined onClick={() => setFullscreen(true)} />
          )}
        </a>
      </div>
    );
  }, [fullScreen, onPluginCallChange]);

  const renderMarkdownPreview = useMemo(() => {
    return (
      <div
        className={`${styles['editor-view']} ry-table ${
          fullScreen ? '' : ' hidden-sm hidden-xs'
        }`}
        dangerouslySetInnerHTML={{ __html: markdownRender.render(value) }}
      ></div>
    );
  }, [fullScreen, markdownRender, value]);

  const editorContainer = useMemo(() => {
    return (
      <div className={styles['editor']}>
        {renderTools}
        <div className={styles['editor-container']}>
          <div
            className={`${styles['editor-textarea-wrap']} ${
              fullScreen ? ' hidden-sm hidden-xs' : ''
            }`}
          >
            <textarea
              placeholder={placeholder}
              value={value}
              ref={ref}
              className={styles['editor-textarea']}
              onChange={(e) => onCallChange(e.target.value)}
            />
          </div>
          {renderMarkdownPreview}
        </div>
      </div>
    );
  }, [
    fullScreen,
    onCallChange,
    placeholder,
    renderMarkdownPreview,
    renderTools,
    value,
  ]);

  return (
    <div>
      {editorContainer}
      <Drawer
        title='全屏编辑'
        placement='left'
        width={'100%'}
        visible={fullScreen}
        onClose={() => setFullscreen(false)}
      >
        <div style={{ height: 'calc(100vh - 100px)' }}>{editorContainer}</div>
      </Drawer>
    </div>
  );
}
