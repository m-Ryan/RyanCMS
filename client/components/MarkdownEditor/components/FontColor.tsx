import React from 'react';
import { FontColorsOutlined } from '@ant-design/icons';
import { PluginItem } from './plugins';
import { GithubPicker, ColorResult } from 'react-color';
import { Popover } from 'antd';

export const FontColor: PluginItem = {
	tip: '字体颜色',
	content: ({ editor, onChange }) => {
		const changeValue = (colorResult: ColorResult) => {
			const { selectionStart, selectionEnd, value, scrollTop } = editor;
			const beginText = `\n<span style="color: ${colorResult.hex}">\n`;
			const endText = '\n</span>\n';
			const selectdText = `${beginText + value.slice(selectionStart, selectionEnd) + endText}`;
			const newValue = value.slice(0, selectionStart) + selectdText + value.slice(selectionEnd);

			onChange({
				selectionStart: selectionStart + beginText.length,
				selectionEnd: selectionEnd + beginText.length,
				value: newValue,
			});
		};
		return (
			<Popover
				content={<GithubPicker triangle="hide" onChangeComplete={changeValue} />}
				title={null}
				trigger="click"
			>
				<FontColorsOutlined />
			</Popover>
		);
	}
};
