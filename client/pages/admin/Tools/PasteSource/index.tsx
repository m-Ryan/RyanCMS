import React, { useState } from 'react';
import styles from './index.module.scss';
import { Input } from 'antd';

export default function PasteSource() {
	const [value, setValue] = useState('');
	const [clipboardData, setClipboardData] = useState('');

	const onPaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
		const clipboardData = event.clipboardData!.getData('text/html');
		setClipboardData(clipboardData);
	};

	return (
		<div className={styles['container']}>
			<Input.TextArea
				placeholder="粘贴源码"
				onPaste={onPaste}
				onChange={e => setValue(e.target.value)}
				value={value}
				rows={16}
			/>
			{clipboardData && (
				<div className={styles['res-value']}>
					<code>{clipboardData}</code>
				</div>
			)}
		</div>
	);
}
