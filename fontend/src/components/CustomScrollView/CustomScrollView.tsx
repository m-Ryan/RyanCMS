import React from 'react';
import styles from './CustomScrollView.module.scss';
import { ReactAutoBind } from '../../util/decorators/reactAutoBind';
import { throttle } from '../../util/decorators/throttle';
import { CustomLoading } from '../CustomLoading/CustomLoading';
interface Props {
	children: React.ReactChild | React.ReactNode;
	onScroll?: () => void;
	loadMore: () => void;
	className?: string;
	showLoading?: boolean;
	noMore: boolean;
	footer?: React.ReactChild | React.ReactNode;
}
interface State {
	loading: boolean;
}
@ReactAutoBind()
export default class CustomScrollView extends React.Component<Props, State> {
	scrollViewElement: React.RefObject<HTMLDivElement>;
	state: State = {
		loading: false
	};
	constructor(props: Props) {
		super(props);
		this.scrollViewElement = React.createRef();
	}

	@throttle(200)
	async onended() {
		this.setState(
			{
				loading: true
			},
			async () => {
				await this.props.loadMore();
				this.setState({ loading: false });
			}
		);
	}

	async onScroll(e: any) {
		if (this.props.noMore) {
			return;
		}
		const distance = 100; //滚动条距离底部的距离
		const { scrollTop, clientHeight, scrollHeight } = e.nativeEvent.target;
		if (scrollTop + clientHeight > scrollHeight - distance) {
			this.onended();
		}
	}

	render() {
		const { children, className, showLoading, noMore, footer } = this.props;
		const { loading } = this.state;
		return (
			<div
				className={`${styles['container']} ${className || ''}`}
				ref={this.scrollViewElement}
				onScroll={this.onScroll}
			>
				{children}
				{noMore ? footer ? footer : <div className={styles['footer']}>已经到达底部了</div> : null}
				{showLoading && loading && <CustomLoading />}
			</div>
		);
	}
}
