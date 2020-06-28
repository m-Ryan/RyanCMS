import { useEffect, useState } from 'react';


export function useDocumentTitle(initTitle: string) {
  const [title, setTile] = useState(initTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return {
    setTile,
    title
  }
}