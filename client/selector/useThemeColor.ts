import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from '../modal/ryan-store';
import { themeColor } from '../modal/themeColor';

export function useThemeColor() {
  const themeColorState = useAppSelector('themeColor');
  const dispatch = useAppDispatch();
  const cssExtractData = window.CSS_EXTRACT_COLOR_PLUGIN;
  const prevStyle = useRef(themeColorState.currentStyle);

  const replaceColor = useCallback(async (payload: { sourceColor: string, nextColor: string; }) => {
    dispatch(themeColor.reducers.replaceColor)(payload);
  }, [dispatch]);

  useEffect(() => {
    if (cssExtractData) {
      dispatch(themeColor.reducers.setSource)(cssExtractData);
    }
  }, [cssExtractData, dispatch, replaceColor]);


  useEffect(() => {
    if (themeColorState.currentStyle !== prevStyle.current) {
      insertStyle(themeColorState.currentStyle);
    }
  }, [themeColorState.currentStyle]);

  return {
    replaceColor,
    themeColorState
  };

}

function insertStyle(styleText: string) {
  let style = document.getElementById('theme-style');

  if (!style) {
    style = document.createElement('style');
    style.id = 'theme-style';
    document.head.appendChild(style);
  }
  style.innerHTML = styleText;
}

