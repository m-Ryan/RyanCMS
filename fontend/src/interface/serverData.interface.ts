import { routerModel, bloggersModel } from '../model';

export interface ServerData {
  title: string;
  props: {
    router?: typeof routerModel.state;
    bloggers?: typeof bloggersModel.state;
    [key: string]: any;
  };
}
