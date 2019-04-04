///<reference path="../../typings/global.d.ts"/>
import { ReduxModel } from 'ryan-redux';
import { ThemeColors } from '@/config/constant';
import _ from 'lodash';
import colorPalette from 'antd-color-palette';

interface IThemeColors {
  name: string;
  defaultColors: string;
  currentColors: string;
}
interface ICssItem {
  source: string;
  fileName: string;
  matchColors: string[];
}
interface ThemeColorModel {
  colorObject: IThemeColors[];
  inited: boolean;
  cssData: ICssItem[];
}

export default class ThemeModel extends ReduxModel<ThemeColorModel> {
  nameSpace = 'theme';

  state: ThemeColorModel = {
    colorObject: [
      {
        name: 'primary',
        defaultColors: ThemeColors.primary,
        currentColors: ThemeColors.primary,
      },
      {
        name: 'link',
        defaultColors: ThemeColors.link,
        currentColors: ThemeColors.link,
      },
    ],
    inited: false,
    cssData: [],
  };

  async initThemeColor() {
    const styleData = window.CSS_EXTRACT_COLOR_PLUGIN || [];
    this.state.cssData = styleData;
    this.state.inited = true;
    this.setState({ ...this.state });
  }

  async saveThemeColor(payload: [{ name: string; color: string }]) {
    if (!this.state.inited) {
      this.initThemeColor();
    }
    let hasMatch = false;
    payload.forEach(item => {
      this.state.colorObject.forEach(current => {
        if (current.name === item.name) {
          current.currentColors = item.color;
          hasMatch = true;
        }
      });
    });
    if (!hasMatch) {
      throw new Error('没有匹配的主题色');
    }
    const { cssData, colorObject } = this.state;
    const fragment = document.createDocumentFragment();
    cssData.forEach(item => {
      let styleText = item.source;
      const changeColors = colorObject.filter(
        colorItem =>
          item.matchColors.some(
            matchColor => colorItem.defaultColors === matchColor,
          ) && colorItem.currentColors !== colorItem.defaultColors,
      );
      changeColors.forEach(changeColor => {
        let count = 10;
        while (count > 0) {
          styleText = replaceColor(
            styleText,
            colorPalette(changeColor.defaultColors, count),
            colorPalette(changeColor.currentColors, count),
          );
          count -= 1;
        }
        styleText = replaceColor(
          styleText,
          changeColor.defaultColors,
          changeColor.currentColors,
        );
      });
      const style = document.createElement('style');
      fragment.appendChild(style);
      style.innerHTML = styleText;
    });
    document.body.appendChild(fragment);
    this.setState({ ...this.state });
    return this.state;
  }
}

function replaceColor(source: string, color: string, replaceColor: string) {
  return source.replace(
    new RegExp(`:\\s*${color}\\b`, 'mig'),
    `: ${replaceColor}`,
  );
}
