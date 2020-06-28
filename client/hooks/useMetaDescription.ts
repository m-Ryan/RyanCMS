import { useEffect, useState } from 'react';


export function useMetaDescription(initDescription: string) {
  const [description, setDescription] = useState(initDescription);

  useEffect(() => {
    const descEle = document.querySelector('meta[name=description]');
    if (descEle) {
      descEle.setAttribute('content', description);
    }
    window.__META_DESCRIPTION__ = description;
  }, [description]);

  return {
    setDescription,
    description
  };
}