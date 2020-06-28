import React from 'react';
import { CodeOutlined } from '@ant-design/icons';
import { PluginItem } from './plugins';

export const Code: PluginItem = {
	tip: '代码块',
	content: ({ editor, onChange }) => {
		const changeValue = () => {
			const { selectionStart, selectionEnd, value, scrollTop } = editor;
			const beginText = '\n```js\n';
			const endText = '\n```\n';
			const selectdText = `${beginText + value.slice(selectionStart, selectionEnd) + endText}`;
			const newValue = value.slice(0, selectionStart) + selectdText + value.slice(selectionEnd);

			onChange({
				selectionStart: selectionStart + beginText.length,
				selectionEnd: selectionEnd + beginText.length,
				value: newValue,
			});
		};
		return <CodeOutlined onClick={changeValue} />;
	},
};
