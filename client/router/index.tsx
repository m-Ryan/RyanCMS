import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfirmBeforeLeavePage } from '../utils/ConfirmBeforeLeavePage';
import { Store } from 'redux';
import { store } from '../modal';
import { BASE_NAME } from '../constant';
import { Routes } from './Routes';

interface IOptions {
  store: Store<any>;
}

export function getApp(url?: string, options?: IOptions) {
  if (url) {
    return (
      <Provider store={options!.store}>
        <StaticRouter basename={BASE_NAME} context={{}} location={url}>
          <Routes />
        </StaticRouter>
      </Provider>
    );
  }
  return (
    <BrowserRouter
      getUserConfirmation={ConfirmBeforeLeavePage.confirmBeforeLeave}
      basename={BASE_NAME}
    >
      <Provider store={store}>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}
