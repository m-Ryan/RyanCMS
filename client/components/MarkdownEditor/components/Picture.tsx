import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { PluginItem, PluginItemProps } from './plugins';
import { Uploader } from '@/client/utils/uploader';
import services from '@/client/services';
import { message } from 'antd';

export const Picture: PluginItem = {
	tip: '链接',
	content: UploaderContent
};


function UploaderContent({ editor, onChange }: PluginItemProps<any>) {
	const [isUploading, setIsUploading] = useState(false);
	const [picture, setPicture] = useState('');

	const { current: uploader } = useRef(new Uploader(services.upload.user.uploadByQiniu, {
		count: 1
	}));

	const onPaste = useCallback(async (e: ClipboardEvent) => {
		const clipboardData = e.clipboardData!;

		for (let i = 0; i < clipboardData.items.length; i++) {
			const item = clipboardData.items[i];
			if (item.kind == 'file') {
				const blob = item.getAsFile();

				if (!blob || blob.size === 0) {
					return;
				}
				uploader.uploadFiles([blob]);
			}
		}
	}, [uploader]);

	useEffect(() => {
		editor && editor.addEventListener('paste', onPaste);

		return () => {
			editor && editor.removeEventListener('paste', onPaste);
		};
	}, [editor, onPaste]);

	useEffect(() => {
		uploader.on('start', photos => {
			message.loading('正在上传');
			setIsUploading(true);
		});

		uploader.on('end', (photos) => {
			message.destroy();
			const picture = photos[0];
			if (picture.status === 'error') {
				message.error('上传失败，请重新上传');
			} else {
				setPicture(picture.url);
			}

			setIsUploading(false);
		});
	}, [uploader]);

	useEffect(() => {
		if (!picture) return;
		const pic: string = `\n![图片1](${picture})\n`;
		const { selectionStart, selectionEnd, value, scrollTop } = editor;
		const newValue = value.slice(0, selectionStart) + pic + value.slice(selectionEnd);
		setPicture('');
		onChange({
			value: newValue,
			selectionStart: selectionStart + pic.length,
			selectionEnd: selectionEnd + pic.length,
		});
	}, [editor, onChange, picture]);

	const onUpload = useCallback(() => {
		if (isUploading) return;
		uploader.chooseFile();
	}, [isUploading, uploader]);


	return <PictureOutlined onClick={onUpload} style={isUploading ? { color: '#ddd' } : undefined} />;
}

