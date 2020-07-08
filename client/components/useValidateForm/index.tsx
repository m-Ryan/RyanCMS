import React, { useState, useMemo, useEffect } from 'react';
import { FormikProps, connect } from 'formik';
import { Form as AForm, Input, Select, Button, Switch } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { ButtonProps } from 'antd/lib/button';
import { TextAreaProps, InputProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { SwitchProps } from 'antd/lib/switch';
import { ImageUploader, ImageUploaderProps } from '../ImageUploader';
import { get } from 'lodash';

export type OwnerProps = { formItem?: Omit<FormItemProps, 'children'> } & {
  name: string;
  label?: boolean;
};

export function createFormItem<T extends OwnerProps>(
  Component: React.FunctionComponent<
    T & { onChange: (v: any, e?: React.BaseSyntheticEvent) => void; value: any }
  >
) {
  return connect<T>(<P extends T & { formik: FormikProps<any> }>(props: P) => {
    const {
      formik,
      name,
      label = true,
      formItem = { validateStatus: '', help: '' },
    } = props;
    const [touched, setTouched] = useState(formik.validateOnMount);
    const path = name.split('.');
    const initValue = get(formik.initialValues, path);
    const value = get(formik.values, path);

    useEffect(() => {
      if (value !== initValue) {
        setTouched(true);
      }
    }, [initValue, value]);

    const error = useMemo(() => {
      if (!touched) return '';
      return get(formik.errors, path);
    }, [formik.errors, path, touched]);

    const componentProps: any = {
      ...props,
      formik: undefined,
      formItem: undefined,
      label: undefined,
    };
    delete componentProps.formik;
    delete componentProps.formItem;
    delete componentProps.label;

    if (!label)
      return (
        <Component
          {...componentProps}
          value={value}
          onChange={(value: any) => {
            formik.setFieldTouched(name, true);
            formik.setFieldValue(name, value);
          }}
        />
      );

    return (
      <AForm.Item
        validateStatus={error ? 'error' : ''}
        help={error || formItem.help}
        {...formItem}
      >
        <Component
          {...componentProps}
          value={value}
          onChange={(value: any) => {
            formik.setFieldTouched(name, true);
            formik.setFieldValue(name, value);
          }}
        />
      </AForm.Item>
    );
  });
}

export const InputField = createFormItem<InputProps & OwnerProps>((props) => {
  return (
    <Input {...props} onChange={(e) => props.onChange(e.target.value, e)} />
  );
});

export const TextAreaField = createFormItem<TextAreaProps & OwnerProps>(
  (props) => {
    return (
      <Input.TextArea
        {...props}
        onChange={(e) => props.onChange(e.target.value, e)}
      />
    );
  }
);

export const SelectField = createFormItem<SelectProps<any> & OwnerProps>(
  (props) => {
    return <Select {...props} onChange={(e) => props.onChange(e, undefined)} />;
  }
);

export const SwitchField = createFormItem<SwitchProps & OwnerProps>((props) => {
  return (
    <Switch
      {...props}
      checked={!!props.value}
      onChange={(e) => props.onChange(e, undefined)}
    />
  );
});

export const ImageUploaderField = createFormItem<
  Omit<ImageUploaderProps, 'onChange' | 'urls'> & OwnerProps
>((props) => {
  const isString = typeof props.value === 'string';

  const urls = useMemo(() => {
    if (typeof props.value === 'string' && props.value) {
      return [props.value];
    } else if (Array.isArray(props.value)) {
      return props.value;
    } else {
      return [];
    }
  }, [props.value]);
  return (
    <ImageUploader
      {...props}
      urls={urls}
      onChange={(urls) => props.onChange(isString ? urls[0] : urls, undefined)}
    />
  );
});

export const ButtonField = connect<ButtonProps>((props) => {
  const {
    formik,
    formik: { initialValues, values },
  } = props;

  const hasChanged = useMemo(() => {
    if (Object.keys(formik.touched).length > 0) {
      return true;
    }
    return initialValues !== values;
  }, [formik.touched, initialValues, values]);

  const isValid = useMemo(() => {
    if (!formik.validateOnMount && !hasChanged) {
      return false;
    }

    return formik.isValid;
  }, [formik.isValid, formik.validateOnMount, hasChanged]);

  return (
    <Button
      {...props}
      disabled={!isValid || props.disabled}
      onClick={formik.submitForm}
    >
      {props.children}
    </Button>
  );
});
