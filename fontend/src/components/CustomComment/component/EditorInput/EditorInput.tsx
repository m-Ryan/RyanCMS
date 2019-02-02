import * as React from 'react';
import * as styles from './EditorInput.module.scss';
import { Button, Input } from 'antd';
const TextArea = Input.TextArea;

interface Props {
	placeholder?: string;
	visible: boolean;
	loading: boolean;
	setContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
	submit: () => any;
}
export function EditorInput(props: Props) {
	const { visible, loading, submit, setContent, placeholder = '发表留言' } = props;
	return (
		<div className={styles['editor']} style={{ maxHeight: visible ? 300 : 0 }}>
			<TextArea onChange={setContent} autosize={{ minRows: 4, maxRows: 4 }} placeholder={placeholder} />
			<Button loading={loading} className={styles['submit-btn']} type="primary" onClick={submit}>
				确定
			</Button>
		</div>
	);
}
