import lessParser from 'postcss-less';
import cssModulesHook from 'css-modules-require-hook';
import React from 'react';
import 'antd';
React.useLayoutEffect = React.useEffect;

const getCSSModuleLocalIdent = () => {
  return '[[local]--[hash:base64:5]';
};

cssModulesHook({
  generateScopedName: getCSSModuleLocalIdent(),
  extensions: ['.css', '.less', '.scss'],
  processorOpts: { parser: lessParser.parse },
});

import { JSDOM } from 'jsdom';
import chalk from 'chalk';
const jsdom = new JSDOM().window;
global.window = jsdom.window as any;
global.document = jsdom.window.document;
global.navigator = jsdom.window.navigator;
(global as any).HTMLElement = class HTMLElement { };
(window as any).matchMedia = () => ({
  addListener() { },
  removeListener() { },
  matches: false,
  media: '(max-width: 700px)',
});

Object.defineProperties(window, {
  history: {
    value: {
      back: () => '',
      replace: () => '',
    },
    writable: true
  },
  location: {
    value: {
      replace: () => '',
      push: () => '',
      reload: () => '',
    },
    writable: true
  },
  localStorage: {
    value: {
      getItem: () => '',
      setItem: () => { }
    },
    writable: true
  },
  sessionStorage: {
    value: {
      getItem: () => '',
      setItem: () => { }
    },
    writable: true
  }
});


process.on('uncaughtException', function (err) {
  console.log(chalk.red('uncaughtException: '));
  console.log(err);
});

process.on('unhandledRejection', function (err) {
  console.log(chalk.red('unhandledRejection: '));
  console.log(err);
});