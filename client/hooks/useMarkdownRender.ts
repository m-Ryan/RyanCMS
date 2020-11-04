import MarkdownIt from 'markdown-it';
import { useEffect, useState } from 'react';

const mockMarkdownRender = {
  render: (node: React.ReactElement | string) => '',
};

export function useMarkdownRender() {
  const [markdownRender, setMarkdownRender] = useState<
    MarkdownIt | typeof mockMarkdownRender
  >(mockMarkdownRender);

  const [inited, setInited] = useState(false);

  useEffect(() => {
    import(
      /* webpackChunkName: "markdownRender" */ '@/client/utils/markdownRender'
    ).then(({ default: data }) => {
      setMarkdownRender(data);
      setInited(true);
    });
  }, []);

  return {
    markdownRender,
    inited,
  };
}
