import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
// import styles from './CustomInput.module.scss';

export function CustomInput(props: InputProps) {
	return <Input {...props} />;
}
