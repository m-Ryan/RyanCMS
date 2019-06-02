import { API } from '../services/API';
import { QiNiuConfig as IQiNiuConfig } from '../services/upload/user';
import { ReduxModel } from 'ryan-redux';

export default class QiNiuConfigModel extends ReduxModel<IQiNiuConfig | null> {
  nameSpace = 'qiNiuConfig';

  state: IQiNiuConfig | null = null;

  async getConfig() {
    if (!this.state) {
      this.state = await API.upload.user.getQiNiuConfig();
      this.setState(this.state);
    }

    return this.state;
  }
}
