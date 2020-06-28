import React from 'react';

export function WhiteSpace({ space = 1 }: { space?: number; }) {
  return <span style={{ whiteSpace: 'pre' }}>{new Array(space).fill(' ').join('')}</span>;
}
