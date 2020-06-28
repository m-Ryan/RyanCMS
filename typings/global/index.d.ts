declare namespace NodeJS {
  interface ProcessEnv {
    NODE_SCENE: 'local' | 'server';
    NODE_ENV: 'development' | 'production' | 'test';
    SSR_SERVER_PORT: string;
    PUBLIC_URL: string;
  }
}
