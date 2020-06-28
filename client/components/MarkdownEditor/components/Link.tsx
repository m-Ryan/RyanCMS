import React from 'react';
import { LinkOutlined } from '@ant-design/icons';
import { PluginItem } from './plugins';

export const Link: PluginItem = {
	tip: '链接',
	content: ({ editor, onChange }) => {
		const changeValue = () => {
			const { selectionStart, selectionEnd, value, scrollTop } = editor;
			const link = value.slice(selectionStart, selectionEnd);
			const newValue = value.slice(0, selectionStart) + `[${link}](链接地址)` + value.slice(selectionEnd);

			onChange({
				value: newValue,
				selectionStart: selectionStart + link.length + 3,
				selectionEnd: selectionStart + link.length + 7,
			});
		};
		return <LinkOutlined onClick={changeValue} />;
	},
};
