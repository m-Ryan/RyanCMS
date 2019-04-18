import { Button, message } from 'antd';
import React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import styles from './index.module.scss';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { ClearUnmountState } from '../../../../util/decorators/clearUnmountState';
import { User } from '../../../../interface/user.interface';
import { ReactAutoBind } from '../../../../util/decorators/reactAutoBind';
import { Link } from 'react-router-dom';

interface Props extends RouteProps, RouterProps {
	user: User;
}

interface State {
	loading: boolean;
	initLoading: boolean;
	resume: string;
}

@ClearUnmountState()
@ReactAutoBind()
export default class Tools extends React.Component<Props, State> {
	state: State = {
		loading: false,
		initLoading: false,
		resume: ''
	};

	public render() {
		return (
			<div className={styles['container']}>
				<LayoutTitle title="小工具" />
				<div className={styles['tools']}>
					<Link to="/admin/tools/json-to-interface">
						<Button type="primary">JSON-to-Ts</Button>
					</Link>
				</div>
			</div>
		);
	}
}
