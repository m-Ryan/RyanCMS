import React, { ComponentProps } from 'react';
import { Form, Radio, Input, Switch } from 'antd';
import { CustomInput } from '../CustomInput/CustomInput';
import { InputProps } from 'antd/lib/input';
import { FormItemProps } from 'antd/lib/form';
import CustomImageUpload, { CustomImageUploadProps } from '../CustomImageUpload/CustomImageUpload';
import RadioGroup from 'antd/lib/radio/group';
import { SwitchProps } from 'antd/lib/switch';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
interface Props extends React.Props<null> {
	options: Array<InputItemProps | SwitchItemProps>;
	className: string;
	callback: Function;
}
export enum Trigger {
	change = 'change',
	blur = 'blur'
}

export interface InputItemProps extends InputProps {
	value: string;
	name: string;
	validator?: {
		dataValid: Function;
		trigger: Array<Trigger>;
	};
	formItem?: FormItemProps;
}

export interface SwitchItemProps extends SwitchProps {
	value: boolean;
	name: string;
	type: string;
	validator?: {
		dataValid: Function;
		trigger: Array<Trigger>;
	};
	formItem?: FormItemProps;
}

export function getFormValue(name: string, options: Array<InputItemProps | SwitchItemProps>) {
	return options.filter((item) => item.name === name)[0] || null;
}

export function getFormValues(options: Array<InputItemProps | SwitchItemProps>): any {
	let optionObj = {};
	options.forEach((item) => {
		optionObj[item.name] = item.value;
	});
	return optionObj;
}

export function CustomForm(props: Props) {
	function onChange(
		e: React.ChangeEvent<HTMLInputElement>,
		item: InputItemProps,
		options: Array<InputItemProps | SwitchItemProps>
	) {
		props.callback(e.target.value, item);
		setValidator(e.target.value, item, options, Trigger.change);
	}

	function onBlur(
		e: React.ChangeEvent<HTMLInputElement>,
		item: InputItemProps,
		options: Array<InputItemProps | SwitchItemProps>
	) {
		props.callback(e.target.value, item);
		setValidator(e.target.value, item, options, Trigger.blur);
	}

	function setValidator(
		value: string,
		item: InputItemProps,
		options: Array<InputItemProps | SwitchItemProps>,
		type: Trigger
	) {
		const validator = item.validator;
		if (!item.formItem) {
			item.formItem = {};
		}
		if (validator && validator.trigger.includes(type)) {
			item.formItem.validateStatus =
				validator && validator.dataValid(value, getFormValues(options)) ? 'success' : 'error';
		}
	}

	function onRemove(item: InputProps) {
		props.callback('', item);
	}
	function onSuccess(url: string, item: InputProps) {
		props.callback(url, item);
	}
	function onSwitch(checked: boolean, item: InputProps) {
		props.callback(checked, item);
	}

	function getComponent(item: any, inputProps: any | CustomImageUploadProps) {
		let formItem;
		switch (item.type) {
			case 'picture':
				formItem = (
					<FormItem {...item.formItem}>
						<CustomImageUpload
							crop={!!item.crop}
							url={item.value}
							onRemove={() => onRemove(item)}
							onSuccess={(url) => onSuccess(url, item)}
						/>
					</FormItem>
				);
				break;
			case 'radio':
				formItem = (
					<FormItem {...item.formItem}>
						<RadioGroup value={item.value} onChange={(e: any) => onChange(e, item, props.options)}>
							{item.option.map((item: any, index: string) => (
								<Radio key={index} value={item.value}>
									{item.label}
								</Radio>
							))}
						</RadioGroup>
					</FormItem>
				);
				break;
			case 'textarea':
				formItem = (
					<FormItem {...item.formItem}>
						<TextArea {...inputProps} onChange={(e: any) => onChange(e, item, props.options)} />
					</FormItem>
				);
				break;
			case 'switch':
				formItem = (
					<FormItem {...item.formItem}>
						<Switch
							checked={inputProps.value}
							{...inputProps}
							onChange={(checked: boolean) => onSwitch(checked, item)}
						/>
					</FormItem>
				);
				break;
			default:
				formItem = (
					<FormItem hasFeedback={true} {...item.formItem}>
						<CustomInput
							autoComplete="off"
							{...inputProps}
							onChange={(e) => onChange(e, item, props.options)}
							onBlur={(e) => onBlur(e, item, props.options)}
						/>
					</FormItem>
				);
		}
		return formItem;
	}

	return (
		<div className={props.className}>
			<Form>
				{props.options.map((item, index) => {
					let inputProps = { ...item };
					delete inputProps.validator;
					delete inputProps.formItem;
					return <div key={index}>{getComponent(item, inputProps)}</div>;
				})}
				{props.children}
			</Form>
		</div>
	);
}
