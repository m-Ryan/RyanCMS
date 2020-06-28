import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { message, Spin, Modal } from 'antd';
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import services from '../../services/index';
import { Uploader, UploadItem } from '@/client/utils/uploader';
import { classnames } from '@/client/utils/tools';

const ERROR_ICON = 'http://assets.maocanhua.cn/FvIaPNdMk32QDYBmaVJF1S6Q0MAW';
const LOADING_ICON = 'http://assets.maocanhua.cn/Fi_vI4vyLhTM-Tp6ivq4dR_ieGHk';

export interface ImageUploaderProps {
  urls: string[];
  count?: number;
  onChange: (url: string[]) => void;
}

export function ImageUploader({
  urls,
  count = 1,
  onChange
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadList, setUploadPhotoList] = useState<UploadItem[]>([]);

  const completeList = useMemo(():UploadItem[] => {
    return urls.map(item => ({ url: item, status: 'done' }));
  }, [urls]);

  useEffect(() => {
    if (!isUploading && uploadList.length > 0) {
      onChange(uploadList.map(item => item.url));
      setUploadPhotoList([]);
    }

  }, [completeList, isUploading, onChange, uploadList]);

  const onRemove = useCallback((index: number) => {
    if (isUploading) {
      setUploadPhotoList(olds => olds.filter((item, i) => index !== i));
    } else {
      onChange(completeList.filter((item, i) => index !== i).map(item => item.url));
    }
  }, [completeList, isUploading, onChange]);

  const onUpload = useCallback(() => {
    if (isUploading) {
      return message.warning('正在上传中，请等待上传完成');
    }
    const uploader = new Uploader(services.upload.user.uploadByQiniu, {
      count
    });

    uploader.on('start', photos => {
      setIsUploading(true);
      setUploadPhotoList(photos);
    });

    uploader.on('progress', photos => {
      setUploadPhotoList(photos);
    });

    uploader.on('end', (photos) => {
      setIsUploading(false);
    });

    uploader.chooseFile();
  }, [count, isUploading]);

  const onPaste = useCallback(async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData!;

    for (let i = 0; i < clipboardData.items.length; i++) {
      const item = clipboardData.items[i];
      if (item.kind == 'file') {
        const blob = item.getAsFile();

        if (!blob || blob.size === 0) {
          return;
        }
        message.loading('正在上传粘贴图片');
        setIsUploading(true);
        try {
          const url = await services.upload.user.uploadByQiniu(blob);
          setUploadPhotoList((olds) => {
            const newData: UploadItem[] = [...olds, { url, status: 'done' }];
            return newData;
          });
        } catch (error) {
          setUploadPhotoList((olds) => {
            const newData: UploadItem[] = [...olds, { url: '', status: 'error' }];
            return newData;
          });
        }
        setIsUploading(false);
        message.destroy();
      }
    }
  }, []);


  const renderContent = useMemo(() => {

    const showUploader = completeList.length + uploadList.length < count;
    return (
      <div className={styles['container']}>
        {
          completeList.map((item, index) => (
            <ImageUploaderItem key={index} index={index} item={item} onRemove={onRemove} />
          ))
        }
        {
          uploadList.map((item, index) => (
            <ImageUploaderItem key={index} index={index} item={item} onRemove={onRemove} />
          ))
        }
        {
          showUploader &&
          (
            <div className={styles['upload']} onClick={onUpload}>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )
        }
      </div>
    );
  }, [completeList, count, onRemove, onUpload, uploadList]);

  return (
    <div onPaste={onPaste} className={styles.wrap}>
      {renderContent}
    </div>
  );
}


export function ImageUploaderItem({ item, index, onRemove }: { item: UploadItem; index: number; onRemove: (index: number) => void; }) {
  const [preview, setPreview] = useState(false);
  const renderContent = useMemo(() => {
    if (item.status === 'pending') {
      return (
        <div className={styles['item']}>
          <div className={classnames(styles['info'])}>
            <img src={LOADING_ICON} alt="加载中" />
            <div className={styles['btn-wrap']}></div>
          </div>
        </div>
      );
    } else if (item.status === 'error') {
      return (
        <div className={classnames(styles['item'], styles.error)}>
          <div className={classnames(styles['info'])}>
            <img src={ERROR_ICON} alt="上传失败" />
            <div className={styles['btn-wrap']}>
              <a title="移除" onClick={() => onRemove(index)}>
                <DeleteOutlined />
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles['item']}>
          <div className={classnames(styles['info'])}>
            <img src={item.status === 'done' ? item.url : ERROR_ICON} alt="标题图：" />
            <div className={styles['btn-wrap']}>
              <a title="预览" onClick={() => setPreview(true)}>
                <EyeOutlined />
              </a>
              <a title="移除" onClick={() => onRemove(index)}>
                <DeleteOutlined />
              </a>
            </div>

          </div>

          <Modal visible={preview} footer={null} onCancel={() => setPreview(false)}>
            <img alt="预览图" style={{ width: '100%' }} src={item.url} />
          </Modal>
        </div>
      );
    }
  }, [index, item.status, item.url, onRemove, preview]);

  return renderContent;

}