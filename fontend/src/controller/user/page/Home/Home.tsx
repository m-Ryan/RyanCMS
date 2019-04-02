import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import styles from './Home.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { User } from '../../../../interface/user.interface';
import { Button } from 'antd';
import { themeModel } from '@/model';
import { GithubPicker, ColorResult } from 'react-color';
import { ReactAutoBind } from '@/util/decorators/reactAutoBind';
interface Props extends RouteProps, RouterProps {
	user: User;
}
interface State {
	loading: boolean;
}

@ReactAutoBind()
export default class Home extends React.Component<Props, State> {
	state: State = {
		loading: false
	};

	setColor(colorResult: ColorResult){
		themeModel.saveThemeColor([{
			name: 'primary',
			color: colorResult.hex
		}])
	}
	render() {
		return (
			<div className={styles['container']}>
				<LayoutTitle title="个人中心" />
				<GithubPicker triangle="hide" onChangeComplete={this.setColor} />
			</div>
		);
	}
}
