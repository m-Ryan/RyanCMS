import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import fs from 'fs-extra';
import axios from 'axios';
import { isProduction } from '../../util/util';
import { SERVER_PORT, CLIENT_PORT } from '../constant/path';
import { matchPath } from 'react-router-dom';
import { render } from 'react-dom';
import { getApp } from '@/client/router';
import { axiosInstance } from '@/client/services/axios.config';
import { modelsMap } from '@/client/modal/index';
import { createStore } from '@/client/modal/ryan-store';
import { getRoutesMap } from '@/client/router/Routes';

import dayjs from 'dayjs';
const whiteList = ['/sockjs-node'];

React.useLayoutEffect = React.useEffect;

type InjectKeys =
  | 'SSR_DOCUMENT_TITLE'
  | 'SSR_THEME_CSS'
  | 'SSR_RENDER_CONTENT'
  | 'SSR_INJECT_PROPS'
  | 'SSR_META_DESCRIPTION';

function injectTemplete(
  text: string,
  obj: Partial<{ [key in InjectKeys]: string }>
) {
  Object.keys(obj).forEach((key) => {
    text = text.replace(new RegExp(`\\/\\* ${key} \\*\\/`), obj[key]);
    text = text.replace(new RegExp(`<!-- ${key} -->`), obj[key]);
  });
  return text;
}

async function getHtmlTemplete(): Promise<string> {
  let htmlTemplete = '';
  return (async () => {
    if (isProduction()) {
      if (htmlTemplete) return htmlTemplete;
      htmlTemplete = await fs.readFile('build/index.html', {
        encoding: 'utf8',
      });
      return htmlTemplete;
    }
    // 开发环境不需要缓存
    const { data } = await axios.get('/', {
      baseURL: `http://localhost:${CLIENT_PORT}`,
    });
    return data;
  })();
}

async function getThemeJson() {
  let json: any[] = [];
  return (async () => {
    if (isProduction()) {
      if (json.length > 0) return json;
      json = JSON.parse(
        await fs.readFile('build/theme.json', {
          encoding: 'utf8',
        })
      );
      return json;
    }
    // 开发环境不需要缓存
    const { data } = await axios.get('/', {
      baseURL: `http://localhost:${CLIENT_PORT}/theme.json`,
    });
    return data;
  })();
}

export const renderFullPage = async (req: Request, res: Response) => {
  // if (whiteList.some((path) => req.path.includes(path))) {
  //   return next();
  // }
  const acceptHost = req.headers['accept-host'] || '';
  // 判断有没有匹配的路由
  const routesMap = getRoutesMap(!!acceptHost);
  if (
    !_.flatMap(Object.values(routesMap)).some((route) =>
      matchPath(req.path, route)
    )
  ) {
    return null;
  }

  const beginTime = dayjs().unix();
  console.log('renderFullPage start');
  window.CSS_EXTRACT_COLOR_PLUGIN = await getThemeJson();
  const url = req.url;

  const initProps = {
    config: {
      acceptHost,
    },
  };
  axiosInstance.defaults.baseURL = `http://localhost:${SERVER_PORT}`;
  const { store } = createStore(modelsMap, initProps);
  // 收集依赖数据
  const initComponent = getApp(url, {
    store,
  });

  render(initComponent, document.createElement('div'));
  await store.awaitSSR(10000);
  const injectProps = JSON.stringify(store.getState());
  // 渲染注入数据的组件
  const component = getApp(url, {
    store,
  });

  const renderContent = ReactDOMServer.renderToStaticMarkup(component);
  const htmlTemplete = await getHtmlTemplete();

  // 注入内容
  const renderHtml = injectTemplete(htmlTemplete, {
    SSR_THEME_CSS: store.getState().themeColor.currentStyle,
    SSR_INJECT_PROPS: `window.__INITIAL_STATE__ = ${injectProps}`,
    SSR_DOCUMENT_TITLE: document.title,
    SSR_META_DESCRIPTION: window.__META_DESCRIPTION__,
    SSR_RENDER_CONTENT: renderContent,
  });
  console.log(`renderFullPage end. time：${dayjs().unix() - beginTime}ms`);
  res.contentType('text/html; charset=utf-8');
  return res.end(renderHtml);
};
