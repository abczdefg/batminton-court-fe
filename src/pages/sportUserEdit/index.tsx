import React, { useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  List,
  InputItem,
  Button,
  Toast,
  WhiteSpace,
  WingBlank,
  NavBar,
  Icon,
  Modal,
} from 'antd-mobile';
import { addSportUser, deleteSportUser, requestSportUserById } from '@/api';
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import commonStyles from '@/styles/common.scss';
import styles from './style.scss';

interface PageProps {
  id: string;
}

interface Props extends RouteComponentProps<PageProps> {
}

interface FormValues {
  nickname: string;
  username: string;
  password: string;
}

const SportUserEdit = (props: Props) => {
  const { history, match } = props;

  const editId = useMemo(() => {
    const { id } = match.params;
    return id === 'add' ? '0' : id;
  }, [match]);

  const isEditing = useMemo(() => editId !== '0', [editId]);

  const onBack = () => {
    history.goBack();
  };

  const renderHeader = useCallback(() => {
    return !isEditing ? '添加账号' : '修改账号';
  }, [isEditing]);

  const onDelete = useCallback(() => {
    const deleteItem = async () => {
      const { error } = await deleteSportUser(editId);
      if (error) {
        Toast.fail('删除失败');
        return;
      }
      Toast.success('删除成功');
      history.replace('/');
    };
    Modal.alert('Delete', 'Are you sure???', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: deleteItem,
      },
    ]);
  }, [editId]);

  const { control, handleSubmit, setValue } = useForm<FormValues>();
  const submitForm: SubmitHandler<FormValues> = async data => {
    const { error } = await addSportUser(data);
    if (error) {
      return;
    }
    history.replace('/');
  };
  const submitError = (errors: FieldErrors) => {
    /* eslint-disable no-restricted-syntax */
    for (const error of Object.values(errors)) {
      Toast.fail(error.message);
      return;
    }
    /* eslint-enable no-restricted-syntax */
  };

  useEffect(() => {
    if (isEditing) {
      requestSportUserById(editId).then(({ data }) => {
        if (data) {
          const { nickname, username } = data;
          setValue('nickname', nickname);
          setValue('username', username);
        }
      });
    }
  }, [isEditing, editId]);

  return (
    <div className={commonStyles.pageContainer}>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={onBack}
      >
        账户详情
      </NavBar>
      <List
        renderHeader={renderHeader}
      >
        { isEditing && (
          <Controller
            name="nickname"
            control={control}
            render={({
              field,
            }) => (
              <InputItem
                {...field}
                disabled
              >
                Nickname
              </InputItem>
            )}
          />
        ) }
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required.' }}
          render={({
            field,
            fieldState: { error },
          }) => (
            <InputItem
              {...field}
              error={!!error}
              clear
              disabled={isEditing}
            >
              Username
            </InputItem>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required.' }}
          render={({
            field,
            fieldState: { error },
          }) => (
            <InputItem
              {...field}
              error={!!error}
              type="password"
              clear
            >
              Password
            </InputItem>
          )}
        />
      </List>
      <WhiteSpace />
      <WingBlank>
        <div className={styles.buttonContainer}>
          { isEditing && (
            <Button
              className={styles.button}
              type="warning"
              inline
              onClick={onDelete}
            >
              删除
            </Button>
          ) }
          <Button
            className={styles.button}
            type="primary"
            inline
            onClick={handleSubmit(submitForm, submitError)}
          >
            确认
          </Button>
        </div>
      </WingBlank>

    </div>
  );
};

export default withRouter(SportUserEdit);
