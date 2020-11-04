import React from 'react';
import { Modal } from 'antd';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import { WarningOutlined } from '@ant-design/icons';
import { ConfirmBeforeLeavePage } from '@/client/utils/ConfirmBeforeLeavePage';

export function UnsaveWarning() {
  const formik = useFormikContext<any>();
  const history = useHistory();

  useEffect(() => {
    ConfirmBeforeLeavePage.register((cb) => {
      if (formik.dirty) {
        Modal.confirm({
          title: '你的修改没有保存，确认退出？',
          content: null,
          okText: '确定',
          cancelText: '取消',
          maskClosable: true,
          icon: <WarningOutlined style={{ color: '#fbbc05' }} />,
          onOk: () => cb(true),
          onCancel: () => cb(false),
        });
      }
    });

    const onCheckUnsave = (event: Event) => {
      if (formik.dirty) {
        event.preventDefault();
        (event.returnValue as any) = '你的修改没有保存，确认退出？';
      }
    };

    window.addEventListener('beforeunload', onCheckUnsave);

    return () => {
      ConfirmBeforeLeavePage.unregister();
      window.removeEventListener('beforeunload', onCheckUnsave);
    };
  }, [formik.dirty, history]);

  return <Prompt when={formik.dirty} message='' />;
}
