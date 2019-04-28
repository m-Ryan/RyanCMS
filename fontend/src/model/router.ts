import { Location } from 'history';
import { ReduxModel } from 'ryan-redux';
import { DOMAIN_PATH, BASE_PATH } from '@/controller/blog/router/blogRoutes';

export interface RouterConfig {
  location?: Location;
  isExtraDomain: boolean;
  renderFromServer: boolean;
}
export default class RouterModel extends ReduxModel<RouterConfig> {
  nameSpace = 'router';

  state: RouterConfig = {
    location: undefined,
    isExtraDomain: false,
    renderFromServer: false,
  };

  setRenderFrom(isFromServer: boolean) {
    this.state.renderFromServer = isFromServer;
    this.setState({ ...this.state });
  }

  getIsFromServer() {
    return this.state.renderFromServer;
  }

  setRouter(location: Location) {
    this.state.location = location;
    this.state.isExtraDomain = !/^\/u\/.+/.test(this.state.location!.pathname);
    this.setState({ ...this.state });
  }

  getIsExtraDomain() {
    return this.state.isExtraDomain;
  }

  getPrefixPath() {
    const prefixPath = this.state.isExtraDomain ? DOMAIN_PATH : BASE_PATH;
    return prefixPath;
  }
}
