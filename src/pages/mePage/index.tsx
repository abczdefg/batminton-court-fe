import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  List, Toast,
} from 'antd-mobile';
import { logout as requestLogout } from '@/api';

interface PageProps {
  id: string;
}

interface Props extends RouteComponentProps<PageProps> {
}

const MePage = (props: Props) => {
  const { history } = props;
  const renderHeader = () => '用户操作';
  const logout = async () => {
    const { error } = await requestLogout();
    if (error) {
      Toast.fail(error.message);
      return;
    }
    history.replace('/login');
  };

  return (
    <List
      renderHeader={renderHeader}
    >
      <List.Item
        arrow="horizontal"
        multipleLine
        onClick={logout}
      >
        退出登录
      </List.Item>
    </List>
  );
};

export default withRouter(MePage);
