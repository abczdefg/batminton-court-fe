import React from 'react';
import { AxiosResponse } from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  List,
  InputItem,
  Button,
  Toast,
} from 'antd-mobile';
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldErrors,
} from 'react-hook-form';
import logo from '@/assets/img/logo.png';
import { userAction } from '@/redux/rootAction';
import styles from './style.scss';

interface Props extends RouteComponentProps {
  login: Function;
}

interface FormValues {
  username: string;
  password: string;
}

const Login = (props: Props) => {
  const { login, history } = props;
  const { control, handleSubmit } = useForm<FormValues>();

  const submitForm: SubmitHandler<FormValues> = data => {
    const { username, password } = data;
    login({ username, password }).then((res: AxiosResponse) => {
      if (res.error) {
        Toast.fail(res.error.message);
        return;
      }
      history.replace('/');
    });
  };
  const submitError = (errors: FieldErrors) => {
    /* eslint-disable no-restricted-syntax */
    for (const error of Object.values(errors)) {
      Toast.fail(error.message);
      return;
    }
    /* eslint-enable no-restricted-syntax */
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src={logo}
        alt="logo"
      />
      <List>
        <Controller
          name="username"
          control={control}
          defaultValue="admin"
          rules={{ required: 'Username is required.' }}
          render={({
            field,
            fieldState: { error },
          }) => (
            <InputItem
              {...field}
              error={!!error}
              clear
            >
              Username
            </InputItem>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue="adminadmin"
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
      <Button className={styles.loginBtn} onClick={handleSubmit(submitForm, submitError)}>
        Login
      </Button>

    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(
  {
    login: userAction.login,
  },
  dispatch,
);

export default withRouter(connect(null, mapDispatchToProps)(Login));
