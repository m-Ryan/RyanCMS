import React from 'react';
import { useState, useEffect } from 'react';

export interface LoadableProps {
  children: Promise<{ default: React.FunctionComponent; }>;
}
export function Loadable({ children }: LoadableProps) {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    children.then((data) => {
      setComponent(data.default);
    });
  }, [children]);

  return <>{Component}</>;
}