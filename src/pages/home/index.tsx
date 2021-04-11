import React, { useState } from 'react';
import { TabBar, NavBar } from 'antd-mobile';
import commonStyles from '@/styles/common.scss';
import SportUserList from '../sportUserList/index';
import MePage from '../mePage/index';

const Home = () => {
  const [tabActive, setTab] = useState('sportUser');
  return (
    <div className={commonStyles.pageContainer}>
      <NavBar
        mode="dark"
      >
        主页
      </NavBar>
      <TabBar hidden={false}>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="任务"
          key="task"
          selected={tabActive === 'task'}
          onPress={() => setTab('task')}
        >
          2
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg' }}
          title="账号"
          key="sportUser"
          selected={tabActive === 'sportUser'}
          onPress={() => setTab('sportUser')}
        >
          <SportUserList />
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg' }}
          title="我"
          key="me"
          selected={tabActive === 'userCenter'}
          onPress={() => setTab('userCenter')}
        >
          <MePage />
        </TabBar.Item>
      </TabBar>
    </div>
  );
};

export default Home;
