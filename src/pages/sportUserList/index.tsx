import React, { useState, useEffect, useCallback } from 'react';
import { Button, List, WhiteSpace } from 'antd-mobile';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { requestSportUsers, SportUserInfo, checkSportUserValid } from '@/api';
import styles from './style.scss';

interface Props extends RouteComponentProps {
}

const SportUserList = (props: Props) => {
  const { history } = props;

  const [sportUsers, setSportUsers] = useState<SportUserInfo[]>([]);
  useEffect(() => {
    requestSportUsers().then(({ data }) => {
      if (data) {
        setSportUsers(data.list);
      }
    });
  }, []);

  const renderHeader = useCallback(() => {
    return sportUsers.length ? '账号列表' : '无账号';
  }, [sportUsers]);

  const [sportUsersValidMap, setSportUsersValid] = useState<{ [id: string]: boolean }>({});
  useEffect(() => {
    Promise.all(sportUsers.map(({ id }) => checkSportUserValid(id))).then(resArr => {
      setSportUsersValid(sportUsers.reduce((prev, cur, index) => {
        const { data } = resArr[index];
        // eslint-disable-next-line no-param-reassign
        prev[cur.id] = !!data?.isValid;
        return prev;
      }, {} as { [id: string]: boolean }));
    });
  }, [sportUsers]);

  return (
    <div>
      <List renderHeader={renderHeader}>
        { sportUsers.map(sportUser => (
          <List.Item
            key={sportUser.id}
            arrow="horizontal"
            multipleLine
            onClick={() => {
              history.push(`/sportUser/${sportUser.id}`);
            }}
          >
            { sportUser.nickname }
            <List.Item.Brief>
              username:
              { sportUser.username }
              { sportUsersValidMap[sportUser.id] && (
                <>
                  <br />
                  <span className={styles.errorText}>
                    该账户已失效，请修改
                  </span>
                </>
              ) }
            </List.Item.Brief>
          </List.Item>
        )) }
      </List>
      <WhiteSpace />
      <Button
        type="primary"
        onClick={() => {
          history.push('/sportUser/add');
        }}
      >
        添加账号
      </Button>
    </div>
  );
};

export default withRouter(SportUserList);
