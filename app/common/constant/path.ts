import path from 'path';

export const cwd = process.cwd();

export const staticDir = path.join(cwd, 'build');

export const SERVER_PORT = 8080;

export const CLIENT_PORT = 3000;
