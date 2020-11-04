import React, { useEffect, useMemo, useCallback } from 'react';
import styles from './index.module.scss';
import HeaderTitle from '@/client/components/HeaderTitle';
import { Button, Select, Input, Switch, Skeleton, message, Modal } from 'antd';
import { useArticle } from '@/client/selector/useArticle';
import { useTagList } from '@/client/selector/useTagList';
import { useCategoryList } from '@/client/selector/useCategoryList';
import { MarkdownEditor } from '@/client/components/MarkdownEditor';
import {
  SelectField,
  InputField,
  TextAreaField,
  ButtonField,
  SwitchField,
} from '@/client/components/useValidateForm';
import { Formik } from 'formik';
import * as yup from 'yup';
import { WhiteSpace } from '@/client/components/WhiteSpace';
import { useQuery } from '@/client/hooks/useQuery';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useLink } from '@/client/components/Link';
import { useUser } from '@/client/selector/useUser';

const schema = yup.object().shape({
  title: yup.string().required('标题不能为空').max(200, '标题不能超过200字'),
  summary: yup.string().required('摘要不能为空').max(240, '摘要不能超过240字'),
  content: yup.string().required('内容不能为空'),
});

const initValues = {
  article_id: 0,
  writer_id: 0,
  category_id: 0,
  title: '',
  summary: '',
  picture: 'http://assets.maocanhua.cn/FtCz4kJRH2c-SqtScIbql3q3OiS5',
  updated_at: 0,
  created_at: 0,
  secret: 0,
  content: '',
  tags: [] as number[],
};

export default function ArticleEditor() {
  const {
    updateArticle,
    updateArticleLoading,
    createArticle,
    createArticleLoading,
    getAdminArticle,
    getAdminArticleLoading,
    articleState,
    setArticle,
  } = useArticle();
  const { tagListState, getAdminList: getTagList } = useTagList();
  const {
    categoryListState,
    getAdminList: getCategoryList,
  } = useCategoryList();
  const { getFormatUrl } = useLink('user');

  const { id } = useQuery();

  useEffect(() => {
    if (!tagListState.list.length) {
      getTagList();
    }
  }, [getTagList, tagListState.list.length]);

  useEffect(() => {
    if (!categoryListState.list.length) {
      getCategoryList();
    }
  }, [categoryListState.list.length, getCategoryList]);

  useEffect(() => {
    if (id) {
      getAdminArticle({
        article_id: id,
      });
    }
    return () => {
      setArticle(null);
    };
  }, [getAdminArticle, id, setArticle]);

  const onSubmit = useCallback(
    async (values: any) => {
      if (values.article_id) {
        await updateArticle({
          ...values,
          secret: values.secret ? 1 : 0,
        });
      } else {
        await createArticle({
          ...values,
          secret: values.secret ? 1 : 0,
        });
      }
      Modal.confirm({
        title: values.article_id ? '更新成功' : '创建成功',
        content: null,
        okText: '查看详情',
        cancelText: '确定',
        maskClosable: true,
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        onOk: () => window.open(getFormatUrl(`/a/${values.title}`)),
      });
    },
    [createArticle, getFormatUrl, updateArticle]
  );

  const renderForm = useMemo(() => {
    if (
      categoryListState.list.length === 0 ||
      tagListState.list.length === 0 ||
      getAdminArticleLoading
    ) {
      return <Skeleton />;
    }

    const data = articleState
      ? {
          ...articleState,
          content: articleState.content.content,
          tags: articleState.tags.map((item) => item.tag_id),
        }
      : {
          ...initValues,
          category_id: categoryListState.list[0].category_id,
          tags: [tagListState.list[0].tag_id],
        };

    return (
      <>
        <Formik
          validationSchema={schema}
          validateOnChange
          initialValues={data}
          onSubmit={onSubmit as any}
        >
          {({ values, setFieldValue }) => (
            <>
              <HeaderTitle
                title='编辑'
                aside={
                  <ButtonField
                    loading={updateArticleLoading || createArticleLoading}
                    type='primary'
                  >
                    提交
                  </ButtonField>
                }
              />
              <div className={styles['header']}>
                <InputField
                  name='title'
                  className={styles['title']}
                  placeholder='标题'
                  addonBefore={
                    <SelectField
                      label={false}
                      name='category_id'
                      style={{ width: 100 }}
                      placeholder='选择类型'
                    >
                      {categoryListState.list.map((item) => (
                        <Select.Option
                          key={item.category_id.toString()}
                          value={item.category_id}
                        >
                          {item.name}
                        </Select.Option>
                      ))}
                    </SelectField>
                  }
                />
              </div>
              <SelectField
                name='tags'
                mode='multiple'
                placeholder='请选择标签'
                className={styles['select']}
                formItem={{
                  label: (
                    <span>
                      标签
                      <WhiteSpace space={14} />
                    </span>
                  ),
                }}
              >
                {tagListState.list.map((item) => (
                  <Select.Option key={item.tag_id} value={item.tag_id}>
                    {item.name}
                  </Select.Option>
                ))}
              </SelectField>
              <TextAreaField
                name='summary'
                className={styles.summary}
                maxLength={150}
                placeholder={'不超过150字'}
                formItem={{
                  label: (
                    <span>
                      摘要
                      <WhiteSpace space={14} />
                    </span>
                  ),
                }}
              />
              <SwitchField
                name='secret'
                checkedChildren={
                  <>
                    <WhiteSpace space={4} />
                    私密
                  </>
                }
                unCheckedChildren={
                  <>
                    <WhiteSpace space={4} />
                    公开
                  </>
                }
                formItem={{
                  label: (
                    <span>
                      状态
                      <WhiteSpace space={14} />
                    </span>
                  ),
                }}
              />
              <MarkdownEditor
                value={values.content}
                onChange={(v) => setFieldValue('content', v)}
                placeholder='请输入文章内容'
              />
            </>
          )}
        </Formik>
      </>
    );
  }, [
    articleState,
    categoryListState.list,
    createArticleLoading,
    getAdminArticleLoading,
    onSubmit,
    tagListState.list,
    updateArticleLoading,
  ]);

  return <div className={styles['container']}>{renderForm}</div>;
}
