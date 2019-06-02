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

  initThemeColor() {
    const styleData = window.CSS_EXTRACT_COLOR_PLUGIN || [];
    this.state.cssData = styleData;
    this.state.inited = true;
    this.setState({ ...this.state });
  }

  setThemeColorData(styleData: ICssItem[]) {
    this.state.cssData = styleData;
    this.state.inited = true;
    this.setState({ ...this.state });
  }

  getReplaceCssText(payload: [{ name: string; color: string }]) {
    const { cssData, colorObject } = this.state;
    let hasMatch = false;
    payload.forEach(item => {
      colorObject.forEach(current => {
        if (current.name === item.name) {
          current.currentColors = item.color;
          hasMatch = true;
        }
      });
    });
    if (!hasMatch) {
      throw new Error('没有匹配的主题色');
    }

    const styleText = cssData
      .map(item => {
        let source = item.source;
        const changeColors = colorObject.filter(
          colorItem =>
            item.matchColors.some(
              matchColor => colorItem.defaultColors === matchColor,
            ) && colorItem.currentColors !== colorItem.defaultColors,
        );
        changeColors.forEach(changeColor => {
          let count = 10;
          while (count > 0) {
            source = replaceColor(
              source,
              colorPalette(changeColor.defaultColors, count),
              colorPalette(changeColor.currentColors, count),
            );
            count -= 1;
          }
          source = replaceColor(
            source,
            changeColor.defaultColors,
            changeColor.currentColors,
          );
        });
        return source;
      })
      .join('');

    return styleText;
  }

  async saveThemeColor(payload: [{ name: string; color: string }]) {
    if (!this.state.inited) {
      this.initThemeColor();
    }

    const styleText = this.getReplaceCssText(payload);
    insertStyle(styleText);
    this.setState({ ...this.state });
    return this.state;
  }
}

function replaceColor(source: string, color: string, replaceColor: string) {
  return source.replace(
    new RegExp(`(:.*?\\s*)(${color})(\\b.*?)(?=})`, 'mig'),
    group => {
      return group.replace(new RegExp(`${color}`, 'mig'), replaceColor);
    },
  );
}

function insertStyle(styleText: string) {
  const style = document.createElement('style');
  style.innerHTML = styleText;
  document.body.appendChild(style);
}
