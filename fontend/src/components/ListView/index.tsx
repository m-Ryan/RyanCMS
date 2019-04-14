import React from 'react';

interface Props<T> {
  data: T[];
  renderItem: (item:T, index: number)=>React.ReactNode;
  show?:boolean;
  empty?: React.ReactNode;
  renderFooter?: React.ReactNode;
}
export function ListView<T>(props: Props<T>) {
  const { data, renderItem, empty, show=true } = props;
  return show? <>
    {
      empty && data.length === 0
      ? empty
      : data.map((item, index) => renderItem(item, index))
    }
  </> : null;
}
