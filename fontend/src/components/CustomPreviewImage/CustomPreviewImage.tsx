import React from 'react';
import styles from './CustomPreviewImage.module.scss';
import { Icon, Modal } from 'antd';
export interface CustomPreviewImageProps {
	url: string;
	onRemove: () => void;
}
interface State {
	visible: boolean;
}
export default class CustomPreviewImage extends React.Component<CustomPreviewImageProps, State> {
	state = {
		visible: false
	};
	render() {
		const { visible } = this.state;
		const { url, onRemove } = this.props;
		return (
			<div className={styles['container']}>
				<div className={styles['info']}>
					<img src={url} alt="标题图：" />
					<div className={styles['btn-wrap']}>
						<a title="预览" onClick={() => this.setState({ visible: true })}>
							<Icon type="eye" />
						</a>
						<a title="移除" onClick={onRemove}>
							<Icon type="delete" />
						</a>
					</div>
				</div>
				<Modal visible={visible} footer={null} onCancel={() => this.setState({ visible: false })}>
					<img alt="预览图" style={{ width: '100%' }} src={url} />
				</Modal>
			</div>
		);
	}
}
